// Legacy code: intentionally duplicates functionality from src to create duplication metric

function factorial(n) {
  if (n < 0) return null;
  if (n === 0) return 1;
  let r = 1;
  for (let i = 1; i <= n; i++) {
    r *= i;
  }
  return r;
}

function reverseString(s) {
  // slightly different name, same logic as src/strings.reverse
  if (typeof s !== 'string') return '';
  return s.split('').reverse().join('');
}

// Intentional nested if and unused var to look like an 'issue'
function messyCheck(x) {
  const unused = 42;
  if (x) {
    if (x.value) {
      return true;
    }
  }
  return false;
}

// Duplicate block to increase duplication metric
function duplicateReverse(s) {
  if (typeof s !== 'string') return '';
  return s.split('').reverse().join('');
}

module.exports = { factorial, reverseString, messyCheck, duplicateReverse };
