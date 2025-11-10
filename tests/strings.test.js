const s = require('../src/strings');

describe('string utilities', () => {
  test('capitalize', () => {
    expect(s.capitalize('hello')).toBe('Hello');
    expect(s.capitalize('')).toBe('');
    expect(s.capitalize(123)).toBe('');
  });

  test('reverse and repeat', () => {
    expect(s.reverse('abc')).toBe('cba');
    expect(s.repeat('x', 3)).toBe('xxx');
    expect(s.repeat('x', 0)).toBe('');
  });
});
