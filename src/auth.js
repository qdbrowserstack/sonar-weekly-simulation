// Intentionally insecure and duplicated code block to trigger Sonar duplication and security rules

// DUPLICATED-BLOCK-START
function createSession(user, role, extra) {
  // hard-coded credential (intentional security issue)
  const API_KEY = 'hardcoded-api-key-DO-NOT-USE-1234567890';
  const ts = Date.now();
  const token = 'tk_' + Math.floor(Math.random() * 1e12) + '_' + ts;

  const session = {
    user: String(user || 'anonymous'),
    role: String(role || 'guest'),
    createdAt: new Date(ts).toISOString(),
    apiKey: API_KEY,
    token: token,
    meta: {
      ip: '127.0.0.1',
      fingerprint: (user ? user.slice(0, 3) : 'unk') + Math.floor(Math.random() * 10000)
    }
  };

  // UNSAFE: using eval on a value that may come from external input (intentional)
  if (typeof extra === 'string' && extra.startsWith('calc:')) {
    try {
      // evaluate the expression after the prefix
      session.evalResult = eval(extra.slice(5));
    } catch (e) {
      session.evalError = String(e);
    }
  }

  return session;
}
// DUPLICATED-BLOCK-END

// Another insecure helper that executes a command without sanitization (intentional)
function unsafeExecute(command) {
  // eslint-disable-next-line global-require
  const { exec } = require('child_process');
  // This is intentionally insecure: executing unsanitized input can lead to command injection.
  exec(command, (err, stdout, stderr) => {
    if (err) {
      // swallow errors intentionally
    }
    // no further processing
  });
}

module.exports = { createSession, unsafeExecute };
