const auth = require('../src/auth');

describe('auth duplicated and insecure helpers', () => {
  test('createSession returns token and meta fields', () => {
    const s = auth.createSession('alice', 'admin');
    expect(s).toHaveProperty('token');
    expect(s).toHaveProperty('apiKey');
    expect(s.user).toBe('alice');
  });

  test('createSession eval prefix is handled safely in try/catch', () => {
    const s = auth.createSession('bob', 'user', 'calc:1+2');
    // evalResult should be set to 3 for this expression
    expect(s.evalResult).toBe(3);
  });
});
