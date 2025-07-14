const { v4: uuidv4 } = require('uuid');
const { Log } = require('logging-middleware');

function generateShortcode() {
  const shortcode = uuidv4().split('-')[0];
  Log('backend', 'debug', 'service', `Generated new shortcode: ${shortcode}`);
  return shortcode;
}

module.exports = { generateShortcode };