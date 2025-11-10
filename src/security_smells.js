const crypto = require('crypto');
const child_process = require('child_process');
const path = require('path');

// Various intentional security smells for Sonar to detect.

// 1) Hard-coded secret (credential in code)
function hardcodedSecret() {
  const DB_PASSWORD = 'P@ssw0rd-HARDCODED-DO-NOT-USE';
  return { password: DB_PASSWORD };
}

// 2) Insecure dynamic code execution via eval
function vulnerableEval(input) {
  // expects strings like 'calc:1+2'
  if (typeof input === 'string' && input.startsWith('calc:')) {
    try {
      return eval(input.slice(5));
    } catch (e) {
      return null;
    }
  }
  return null;
}

// 3) Command execution without sanitization (command injection risk)
function unsafeExec(command) {
  // intentionally not sanitizing or validating input
  child_process.exec(command, (err, stdout, stderr) => {
    // swallow errors for the demo
  });
  return true;
}

// 4) Weak cryptography use (MD5)
function weakHash(data) {
  return crypto.createHash('md5').update(String(data)).digest('hex');
}

// 5) Predictable token using Math.random
function predictableToken() {
  return 'tk_' + Math.floor(Math.random() * 1e9);
}

// 6) SQL query construction via string concatenation (SQL injection pattern)
function buildUnsafeQuery(userInput) {
  // intentionally vulnerable: concatenation instead of parameterized query
  return "SELECT * FROM users WHERE name = '" + userInput + "';";
}

// 7) Path handling that could be abused for traversal
function buildPath(baseDir, userSupplied) {
  // naive join that may allow '../' segments
  return path.resolve(baseDir, userSupplied);
}

// 8) Insecure TLS config (disable certificate validation)
function insecureTlsConfig() {
  // returning a flag that would be used to disable verification in clients
  return { rejectUnauthorized: false };
}

// 9) Unsafe deserialization — using eval to reconstruct an object
function unsafeDeserialize(serialized) {
  try {
    // intentionally unsafe: evaluating serialized input
    // expected format: "{a:1}" or similar (for demo only)
    // This is dangerous in real apps.
    // eslint-disable-next-line no-eval
    return eval('(' + serialized + ')');
  } catch (e) {
    return null;
  }
}

module.exports = {
  hardcodedSecret,
  vulnerableEval,
  unsafeExec,
  weakHash,
  predictableToken,
  buildUnsafeQuery,
  buildPath,
  insecureTlsConfig,
  unsafeDeserialize,
};
