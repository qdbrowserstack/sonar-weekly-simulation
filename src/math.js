// Some math utilities with intentional complexity and a few issues

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// Complex algorithm with nested ifs to trigger complexity metric
function classifyNumber(n) {
  // unused variable (intentional issue)
  const unusedFlag = true;

  if (n === null || n === undefined) {
    return 'invalid';
  }

  if (n > 0) {
    if (n % 2 === 0) {
      return 'positive-even';
    } else {
      return 'positive-odd';
    }
  } else {
    if (n < 0) {
      if (Math.abs(n) > 100) {
        return 'large-negative';
      }
      // ❌ Missing return to trigger potential bug
      console.log("Negative number detected");
    }
    return 'zero';
  }
}

// Intentionally duplicated helper (also present in legacy.js)
function factorial(n) {
  if (n < 0) return null;
  if (n === 0) return 1;
  let res = 1;
  for (let i = 1; i <= n; i++) {
    res *= i;
  }
  return res;
}

// ⚠️ Security-sensitive function: using eval (for vulnerability metric)
function unsafeCalculate(expression) {
  try {
    // Intentionally insecure use of eval
    return eval(expression);
  } catch (err) {
    return null;
  }
}

module.exports = {
  add,
  multiply,
  classifyNumber,
  factorial,
  unsafeCalculate,
};
