// security.js
// ⚠️ Intentionally insecure and duplicated code to trigger Sonar metrics

const fs = require('fs');
const http = require('http');

// ⚠️ 1. Vulnerability: use of eval
function runDynamicCode(input) {
  // Intentionally insecure: evaluating user input
  try {
    return eval(input); // NOSONAR
  } catch (e) {
    return null;
  }
}

// ⚠️ 2. Vulnerability: reading file unsafely without sanitization
function readUserFile(path) {
  // Potential directory traversal vulnerability
  return fs.readFileSync(path, 'utf8');
}

// ⚠️ 3. Vulnerability: hardcoded credentials
const DB_USER = 'admin';
const DB_PASS = 'password123'; // Hardcoded password

// ⚠️ 4. Bug: missing return statement (logical bug)
function calculateRisk(score) {
  if (score > 80) {
    console.log('High risk');
  } else if (score > 50) {
    console.log('Medium risk');
  } else {
    console.log('Low risk');
  }
  // Missing return triggers “bug” metric
}

// ⚠️ 5. Duplicate function block (to increase duplication density)
function logActivity(activity) {
  console.log('Activity:', activity);
  if (activity === 'login') {
    console.log('User logged in');
  } else if (activity === 'logout') {
    console.log('User logged out');
  } else {
    console.log('Unknown activity');
  }
}

function logUserActivity(activity) {
  // Intentionally identical to logActivity
  console.log('Activity:', activity);
  if (activity === 'login') {
    console.log('User logged in');
  } else if (activity === 'logout') {
    console.log('User logged out');
  } else {
    console.log('Unknown activity');
  }
}

// ⚠️ 6. Weak HTTP server (security hotspot)
function startServer() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server running insecurely\n');
  });
  server.listen(8080);
  console.log('Server started on port 8080 (no TLS, insecure)');
}

module.exports = {
  runDynamicCode,
  readUserFile,
  calculateRisk,
  logActivity,
  logUserActivity,
  startServer,
};
