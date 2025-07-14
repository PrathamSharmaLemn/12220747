const { Log } = require('logging-middleware');

class URL {
  static storage = {};

  constructor(url, shortcode, expiry) {
    this.url = url;
    this.shortcode = shortcode;
    this.expiry = expiry;
    this.createdAt = new Date();
    this.clickCount = 0;
    this.clickHistory = [];
    Log('backend', 'debug', 'domain', `URL object created for shortcode: ${shortcode}`);
  }

  static create(url, shortcode, expiry) {
    Log('backend', 'info', 'domain', `Creating URL mapping: ${shortcode} -> ${url}`);
    const urlInstance = new URL(url, shortcode, expiry);
    URL.storage[shortcode] = urlInstance;
    Log('backend', 'debug', 'domain', `URL stored in memory. Total URLs: ${Object.keys(URL.storage).length}`);
    return urlInstance;
  }

  static exists(shortcode) {
    const exists = shortcode in URL.storage;
    Log('backend', 'debug', 'domain', `Checking existence of shortcode: ${shortcode} - ${exists ? 'exists' : 'not found'}`);
    return exists;
  }

  static get(shortcode) {
    const urlData = URL.storage[shortcode];
    if (urlData) {
      Log('backend', 'debug', 'domain', `Retrieved URL data for shortcode: ${shortcode}`);
    } else {
      Log('backend', 'warn', 'domain', `Attempted to retrieve non-existent shortcode: ${shortcode}`);
    }
    return urlData;
  }

  expired() {
    const isExpired = new Date() > this.expiry;
    if (isExpired) {
      Log('backend', 'warn', 'domain', `URL with shortcode ${this.shortcode} has expired`);
    }
    return isExpired;
  }
}

module.exports = { URL };