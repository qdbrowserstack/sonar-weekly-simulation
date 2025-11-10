const sec = require('../src/security');
const fs = require('fs');

describe('security file simulation', () => {
  test('eval runs insecurely', () => {
    expect(sec.runDynamicCode('2+3')).toBe(5);
    expect(sec.runDynamicCode('invalid')).toBeNull();
  });

  test('duplicate functions', () => {
    expect(typeof sec.logActivity).toBe('function');
    expect(typeof sec.logUserActivity).toBe('function');
  });

  test('file reading mock', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('dummy');
    expect(sec.readUserFile('test.txt')).toBe('dummy');
  });
});
