// String utilities with a bit of duplication and small issues

function capitalize(s) {
  if (typeof s !== 'string') return '';
  if (s.length === 0) return s;
  return s[0].toUpperCase() + s.slice(1);
}

function reverse(s) {
  if (typeof s !== 'string') return '';
  return s.split('').reverse().join('');
}

// Another small function that might be duplicated elsewhere
function repeat(s, times) {
  if (times <= 0) return '';
  let out = '';
  for (let i = 0; i < times; i++) {
    out += s;
  }
  return out;
}

module.exports = { capitalize, reverse, repeat };
