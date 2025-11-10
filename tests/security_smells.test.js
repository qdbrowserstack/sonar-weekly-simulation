const ss = require('../src/security_smells');
const child = require('child_process');

describe('security_smells module', () => {
	test('hardcoded secret present', () => {
		const s = ss.hardcodedSecret();
		expect(s).toHaveProperty('password');
		expect(typeof s.password).toBe('string');
	});

	test('vulnerableEval computes expression', () => {
		expect(ss.vulnerableEval('calc:2+3')).toBe(5);
		expect(ss.vulnerableEval('calc:invalid')).toBeNull();
	});

	test('unsafeExec calls child_process.exec', () => {
		const spy = jest.spyOn(child, 'exec').mockImplementation((cmd, cb) => cb(null, 'ok', ''));
		expect(ss.unsafeExec('echo hello')).toBe(true);
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});

	test('weakHash produces known md5 for abc', () => {
		expect(ss.weakHash('abc')).toBe('900150983cd24fb0d6963f7d28e17f72');
	});

	test('predictableToken returns a string', () => {
		const t = ss.predictableToken();
		expect(typeof t).toBe('string');
	});

	test('buildUnsafeQuery concatenates input', () => {
		const q = ss.buildUnsafeQuery("'; DROP TABLE users; --");
		expect(q).toContain("'; DROP TABLE users; --");
	});

	test('buildPath resolves user path', () => {
		const resolved = ss.buildPath('/tmp', '../etc/passwd');
		expect(typeof resolved).toBe('string');
	});

	test('insecureTlsConfig returns object with rejectUnauthorized false', () => {
		const cfg = ss.insecureTlsConfig();
		expect(cfg.rejectUnauthorized).toBe(false);
	});

	test('unsafeDeserialize returns object for simple input', () => {
		const obj = ss.unsafeDeserialize('{a:1, b:2}');
		expect(obj).toHaveProperty('a');
		expect(obj.a).toBe(1);
	});
});

