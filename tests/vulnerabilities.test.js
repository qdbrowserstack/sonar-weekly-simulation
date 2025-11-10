const v = require('../src/vulnerabilities');

describe('vulnerabilities module (declarative, non-executing checks)', () => {
  test('exports vulnerable functions', () => {
    expect(typeof v.sqlInjectionPg).toBe('function');
    expect(typeof v.commandInjectionSync).toBe('function');
    expect(typeof v.insecureHttpsRequest).toBe('function');
    expect(typeof v.evalTainted).toBe('function');
    expect(typeof v.weakCipher).toBe('function');
  });
});
