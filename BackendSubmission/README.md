# URL Shortener Backend

A robust URL shortening service built with Node.js and Express.

## Features

- Create shortened URLs with custom or auto-generated codes
- Track click statistics and analytics
- URL expiration management
- Comprehensive logging system
- Error handling and validation

## My Approach

I designed this application with a modular architecture:

1. **Separation of Concerns**: Split the application into distinct layers (routes, models, utilities)
2. **Comprehensive Logging**: Implemented strategic logging throughout the application lifecycle
3. **Error Handling**: Added robust error handling for both expected and unexpected scenarios
4. **Data Validation**: Input validation for URL format and shortcode conflicts

## Architecture

```
src/
├── app.js          # Express application setup
├── index.js        # Server initialization and process management
├── routes.js       # API route definitions
models/
├── url.js          # URL data model and business logic
utils/
├── shortcode.js    # Shortcode generation utility
```

## Installation

```bash
npm install
npm start
```

## API Endpoints

- `POST /shorturls` - Create a new short URL
- `GET /shorturls/:shortcode` - Get statistics for a short URL  
- `GET /:shortcode` - Redirect to original URL

## Environment Variables

```
PORT=3001
# Add other environment variables as needed
```

## Logging

The application uses a custom logging middleware that provides:
- Local console logging for development
- External API logging for production monitoring
- Structured log levels (debug, info, warn, error, fatal)
- Package-specific logging for better traceability

---
*Developed by Pratham Sharma*
