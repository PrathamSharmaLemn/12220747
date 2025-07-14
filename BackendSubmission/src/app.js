const express = require('express');
const routes = require('./routes');
const { Log } = require('logging-middleware');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  Log('backend', 'info', 'handler', `Request received: ${req.method} ${req.path}`);
  next();
});

routes(app);

module.exports = app; 