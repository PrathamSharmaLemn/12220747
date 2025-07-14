const express = require('express');
const { URL: URLModel } = require('../models/url');
const { generateShortcode } = require('../utils/shortcode');
const { Log } = require('logging-middleware');

function initRoutes(app) {
  // API endpoint to create shortened URLs
  app.post('/shorturls', (req, res) => {
    const { url, validity = 30, shortcode } = req.body;

    Log('backend', 'info', 'route', `Creating short URL for: ${url}`);

    // Validate URL format
    if (!url || !isValidUrl(url)) {
      Log('backend', 'error', 'route', `Invalid URL format: ${url}`);
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Check for shortcode conflicts
    if (shortcode && URLModel.exists(shortcode)) {
      Log('backend', 'warn', 'route', `Shortcode collision: ${shortcode}`);
      return res.status(409).json({ error: 'Shortcode collision' });
    }

    // Generate shortcode and create URL mapping
    const finalShortcode = shortcode || generateShortcode();
    const expiryTime = new Date(Date.now() + validity * 60000);
    URLModel.create(url, finalShortcode, expiryTime);

    const shortLink = `http://${req.hostname}:${process.env.PORT || 3000}/${finalShortcode}`;
    Log('backend', 'info', 'route', `Short URL created: ${shortLink}`);
    res.status(201).json({
      shortLink,
      expiry: expiryTime.toISOString(),
    });
  });

  app.get('/shorturls/:shortcode', (req, res) => {
    const { shortcode } = req.params;
    Log('backend', 'debug', 'route', `Fetching stats for shortcode: ${shortcode}`);

    const urlData = URLModel.get(shortcode);

    if (!urlData || urlData.expired()) {
      Log('backend', 'error', 'route', `Non-existent or expired link: ${shortcode}`);
      return res.status(404).json({ error: 'Non-existent or expired link' });
    }

    res.status(200).json({
      totalClicks: urlData.clickCount,
      originalURL: urlData.url,
      creationDate: urlData.createdAt.toISOString(),
      expiryDate: urlData.expiry.toISOString(),
      clickData: urlData.clickHistory,
    });
  });

  app.get('/:shortcode', (req, res) => {
    const { shortcode } = req.params;
    Log('backend', 'info', 'route', `Redirecting shortcode: ${shortcode}`);

    const urlData = URLModel.get(shortcode);

    if (!urlData || urlData.expired()) {
      Log('backend', 'error', 'route', `Non-existent or expired link: ${shortcode}`);
      return res.status(404).json({ error: 'Non-existent or expired link' });
    }

    urlData.clickCount += 1;
    urlData.clickHistory.push({
      timestamp: new Date().toISOString(),
      source: req.get('Referer') || 'Unknown',
      location: 'Unknown', 
    });
    res.redirect(urlData.url);
  });
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

module.exports = initRoutes;