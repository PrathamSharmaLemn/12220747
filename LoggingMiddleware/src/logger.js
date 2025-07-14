require('dotenv').config();
const fetch = require('node-fetch');

// Define allowed values based on the API constraints
const ALLOWED_STACKS = ['backend', 'frontend'];
const ALLOWED_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];
const BACKEND_PACKAGES = ['cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service'];
const FRONTEND_PACKAGES = ['api'];
const ALL_PACKAGES = [...BACKEND_PACKAGES, ...FRONTEND_PACKAGES];

async function Log(stack, level, packageName, message) {
  // Validate input parameters
  if (!ALLOWED_STACKS.includes(stack)) {
    console.error(`Invalid stack: ${stack}. Allowed values: ${ALLOWED_STACKS.join(', ')}`);
    return;
  }
  
  if (!ALLOWED_LEVELS.includes(level)) {
    console.error(`Invalid level: ${level}. Allowed values: ${ALLOWED_LEVELS.join(', ')}`);
    return;
  }
  
  if (!ALL_PACKAGES.includes(packageName)) {
    console.error(`Invalid package: ${packageName}. Allowed values: ${ALL_PACKAGES.join(', ')}`);
    return;
  }
  
  // Validate stack-package combinations
  if (stack === 'backend' && !BACKEND_PACKAGES.includes(packageName)) {
    console.error(`Package '${packageName}' cannot be used with backend stack. Use: ${BACKEND_PACKAGES.join(', ')}`);
    return;
  }
  
  if (stack === 'frontend' && !FRONTEND_PACKAGES.includes(packageName)) {
    console.error(`Package '${packageName}' cannot be used with frontend stack. Use: ${FRONTEND_PACKAGES.join(', ')}`);
    return;
  }

  const logData = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: packageName.toLowerCase(),
    message,
    timestamp: new Date().toISOString(),
  };

  // Log locally first for debugging and immediate feedback
  console.log(`[${level.toUpperCase()}] ${stack}/${packageName}: ${message}`);

  try {
    // Get auth token from environment variable
    const token = process.env.AUTH_TOKEN;
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add authorization header if token is available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers,
      body: JSON.stringify(logData),
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.warn(`External logging failed (${response.status}): ${response.statusText} - ${responseText}`);
      return;
    }
    
    console.log('✓ Successfully logged to external service');
  } catch (error) {
    console.warn('External logging API unavailable (continuing anyway):', error.message);
  }
}

module.exports = { Log };