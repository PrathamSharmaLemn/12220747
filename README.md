# URL Shortener

A robust URL shortening service built with Node.js, Express, and a custom logging middleware.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **Custom Shortcodes**: Support for user-defined shortcodes or auto-generated ones
- **Analytics**: Track click statistics and user engagement
- **Expiration Management**: Set custom expiration times for URLs
- **Comprehensive Logging**: Strategic logging throughout the application lifecycle
- **Error Handling**: Robust error handling for production use

## 📁 Project Structure

```
url-shortener/
├── BackendSubmission/          # Main application
│   ├── src/
│   │   ├── app.js             # Express application setup
│   │   ├── index.js           # Server initialization
│   │   └── routes.js          # API route definitions
│   ├── models/
│   │   └── url.js             # URL data model
│   ├── utils/
│   │   └── shortcode.js       # Shortcode generation utility
│   ├── tests/
│   │   └── test-routes.js     # API tests
│   ├── package.json           # Dependencies and scripts
│   └── README.md              # Application documentation
└── LoggingMiddleware/          # Custom logging package
    ├── src/
    │   ├── index.js           # Package entry point
    │   └── logger.js          # Logging implementation
    └── package.json           # Package configuration
```

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd url-shortener
   ```

2. **Install dependencies for the main application**
   ```bash
   cd BackendSubmission
   npm install
   ```

3. **Install dependencies for the logging middleware**
   ```bash
   cd ../LoggingMiddleware
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cd ../BackendSubmission
   cp .env.example .env
   # Edit .env with your configuration
   ```

## 🚀 Usage

### Starting the Server

```bash
cd BackendSubmission
npm start
```

The server will start on `http://localhost:3001`

### API Endpoints

#### Create Short URL
```http
POST /shorturls
Content-Type: application/json

{
  "url": "https://www.example.com",
  "validity": 60,
  "shortcode": "optional-custom-code"
}
```

**Response:**
```json
{
  "shortLink": "http://localhost:3001/abc123",
  "expiry": "2025-07-14T08:00:00.000Z"
}
```

#### Get URL Statistics
```http
GET /shorturls/:shortcode
```

**Response:**
```json
{
  "totalClicks": 5,
  "originalURL": "https://www.example.com",
  "creationDate": "2025-07-14T07:00:00.000Z",
  "expiryDate": "2025-07-14T08:00:00.000Z",
  "clickData": [...]
}
```

#### Redirect to Original URL
```http
GET /:shortcode
```

Redirects to the original URL and tracks the click.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the BackendSubmission directory:

```env
PORT=3001
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
AUTH_TOKEN=your-auth-token
```

## 📊 Logging

The application uses a custom logging middleware that provides:

- **Local Console Logging**: Immediate feedback during development
- **External API Logging**: Integration with evaluation services
- **Structured Logging**: Organized by stack, level, and package
- **Multiple Log Levels**: debug, info, warn, error, fatal

### Log Packages Used:
- `service` - Application lifecycle and utilities
- `handler` - HTTP middleware operations
- `route` - API endpoint operations  
- `domain` - Business logic and data models

## 🧪 Testing

```bash
npm test
```

## 🏗 Architecture

### Design Principles

- **Separation of Concerns**: Clear separation between routes, models, and utilities
- **Modular Architecture**: Reusable logging middleware as a separate package
- **Error Handling**: Comprehensive error handling at all levels
- **Logging Strategy**: Strategic logging for observability and debugging

### Key Components

- **Express Server**: RESTful API with proper middleware
- **URL Model**: In-memory storage with expiration logic
- **Shortcode Generator**: UUID-based shortcode generation
- **Logging Middleware**: Reusable package for application observability

## 📝 Development Notes

This project demonstrates:
- RESTful API design
- Custom middleware development
- Error handling best practices
- Comprehensive logging strategies
- Modular Node.js architecture

## 👨‍💻 Author

**Pratham Sharma**
- Email: prathamsharma7977@gmail.com
- GitHub: PrathamSharmaLemn

## 📄 License

ISC License - see package.json for details
"# 12220747 - URL Shortener Service

A robust URL shortening service built with Node.js and Express, featuring comprehensive logging middleware.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **Custom Shortcodes**: Support for user-defined shortcodes
- **Analytics**: Track click statistics and user engagement
- **Expiration Management**: Set custom expiration times for URLs
- **Comprehensive Logging**: Built-in logging middleware with external API integration
- **Error Handling**: Robust error handling and validation

## 📁 Project Structure

```
url-shortener/
├── BackendSubmission/          # Main application
│   ├── src/
│   │   ├── app.js             # Express application setup
│   │   ├── index.js           # Server initialization
│   │   └── routes.js          # API routes
│   ├── models/
│   │   └── url.js             # URL data model
│   ├── utils/
│   │   └── shortcode.js       # Shortcode generation utility
│   └── tests/
│       └── test-routes.js     # API tests
├── LoggingMiddleware/          # Reusable logging package
│   └── src/
│       ├── index.js           # Main export
│       └── logger.js          # Logging implementation
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/PrathamSharmaLemn/12220747.git
   cd 12220747
   ```

2. Install dependencies for the main application:
   ```bash
   cd BackendSubmission
   npm install
   ```

3. Install dependencies for the logging middleware:
   ```bash
   cd ../LoggingMiddleware
   npm install
   ```

4. Set up environment variables:
   ```bash
   cd ../BackendSubmission
   # Create .env file with required variables
   PORT=3001
   # Add other environment variables as needed
   ```

## 🚀 Running the Application

```bash
cd BackendSubmission
npm start
```

The server will start on `http://localhost:3001`

## 📚 API Documentation

### Create Short URL
**POST** `/shorturls`

Request Body:
```json
{
  "url": "https://example.com",
  "validity": 60,
  "shortcode": "optional-custom-code"
}
```

Response:
```json
{
  "shortLink": "http://localhost:3001/abc123",
  "expiry": "2025-07-14T08:00:00.000Z"
}
```

### Get URL Statistics
**GET** `/shorturls/:shortcode`

Response:
```json
{
  "totalClicks": 5,
  "originalURL": "https://example.com",
  "creationDate": "2025-07-14T07:00:00.000Z",
  "expiryDate": "2025-07-14T08:00:00.000Z",
  "clickData": [...]
}
```

### Redirect to Original URL
**GET** `/:shortcode`

Redirects to the original URL and tracks the click.

## 🔧 Logging Middleware

The project includes a custom logging middleware that provides:

- **Structured Logging**: Consistent log format across the application
- **Multiple Log Levels**: debug, info, warn, error, fatal
- **External API Integration**: Sends logs to external monitoring service
- **Input Validation**: Ensures proper log format and constraints
- **Local Fallback**: Continues logging locally if external service is unavailable

### Usage Example:
```javascript
const { Log } = require('logging-middleware');

Log('backend', 'info', 'service', 'Application started successfully');
```

## 🧪 Testing

```bash
npm test
```

## 👨‍💻 Development

- **Author**: Pratham Sharma
- **Email**: prathamsharma7977@gmail.com
- **GitHub**: PrathamSharmaLemn
- **Roll No**: 12220747

## 📝 Technical Implementation

### Architecture
- **RESTful API**: Clean API design following REST principles
- **Modular Structure**: Separation of concerns with distinct layers
- **In-Memory Storage**: Fast URL lookup and storage
- **Middleware Integration**: Comprehensive request/response logging
- **Error Handling**: Graceful error handling and user feedback

### Key Technologies
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **UUID**: Shortcode generation
- **dotenv**: Environment configuration
- **Jest**: Testing framework

## 🔒 Security Features

- URL validation and sanitization
- Shortcode collision detection
- Input validation and error handling
- Environment variable protection

## 📄 License

ISC License

---

*This project demonstrates proficiency in Node.js backend development, API design, logging architecture, and software engineering best practices.*" 
