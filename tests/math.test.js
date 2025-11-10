const math = require('../src/math');

describe('math utilities', () => {
  test('add and multiply', () => {
    expect(math.add(1, 2)).toBe(3);
    expect(math.multiply(3, 4)).toBe(12);
  });

  test('classifyNumber branches', () => {
    expect(math.classifyNumber(null)).toBe('invalid');
    expect(math.classifyNumber(2)).toBe('positive-even');
    expect(math.classifyNumber(3)).toBe('positive-odd');
    expect(math.classifyNumber(0)).toBe('zero');
    expect(math.classifyNumber(-5)).toBe('negative');
    expect(math.classifyNumber(-200)).toBe('large-negative');
  });

  test('factorial and edge cases', () => {
    expect(math.factorial(0)).toBe(1);
    expect(math.factorial(5)).toBe(120);
    expect(math.factorial(-1)).toBeNull();
  });
});
