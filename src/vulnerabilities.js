// Explicit vulnerable patterns to trigger Sonar vulnerability rules.
// Functions are NOT executed by tests to avoid running dangerous operations.

// 1) SQL injection pattern using pg (concatenated query)
function sqlInjectionPg(userInput) {
  // NOTE: require is inside the function so importing this module is safe.
  const { Client } = require('pg'); // static pattern for sonar
  const client = new Client();
  const query = "SELECT * FROM users WHERE name = '" + userInput + "'";
  // vulnerable sink: passing concatenated query to client.query
  client.query(query);
}

// 2) Command injection via execSync with tainted input
function commandInjectionSync(userInput) {
  const child = require('child_process');
  // vulnerable sink: execSync called with concatenated user input
  child.execSync('cat ' + userInput);
}

// 3) Insecure TLS options when creating a request (disable cert validation)
function insecureHttpsRequest() {
  const https = require('https');
  const opts = { hostname: 'example.com', port: 443, method: 'GET', rejectUnauthorized: false };
  // This demonstrates disabling certificate validation
  const req = https.request(opts, () => {});
  req.end();
}

// 4) Using eval on a tainted source (again)
function evalTainted(obj) {
  const data = obj.userProvided;
  // eslint-disable-next-line no-eval
  return eval(data);
}

// 5) Weak crypto usage: using DES via createCipher (deprecated/insecure)
function weakCipher(data, key) {
  const crypto = require('crypto');
  // deprecated algorithm example (for detection by analyzers)
  const cipher = crypto.createCipher('des', key);
  let out = cipher.update(String(data), 'utf8', 'hex');
  out += cipher.final('hex');
  return out;
}

module.exports = {
  sqlInjectionPg,
  commandInjectionSync,
  insecureHttpsRequest,
  evalTainted,
  weakCipher,
};
