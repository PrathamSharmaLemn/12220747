require('dotenv').config();
const app = require('./app');
const { Log } = require('logging-middleware');

const PORT = process.env.PORT || 3001;

// Start logging when server begins initialization
Log('backend', 'info', 'service', `Starting URL shortener service on port ${PORT}`);

const server = app.listen(PORT, () => {
  // Log successful startup
  Log('backend', 'info', 'service', `Server successfully started and listening on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});

// Handle graceful shutdown signals
process.on('SIGTERM', () => {
  Log('backend', 'info', 'service', 'SIGTERM received, shutting down gracefully');
  server.close(() => {
    Log('backend', 'info', 'service', 'Server shutdown complete');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  Log('backend', 'info', 'service', 'SIGINT received, shutting down gracefully');
  server.close(() => {
    Log('backend', 'info', 'service', 'Server shutdown complete');
    process.exit(0);
  });
});

// Error handling for unexpected exceptions
process.on('uncaughtException', (error) => {
  Log('backend', 'fatal', 'service', `Uncaught exception: ${error.message}`);
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  Log('backend', 'error', 'service', `Unhandled promise rejection: ${reason}`);
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});