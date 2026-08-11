/* ==========================================================================
   Test suite — run with:  node tests.js
   No dependencies: uses Node's built-in assert module.
   ========================================================================== */

const assert = require('node:assert');

const { reverseString, countCharacters, capitalizeWords } = require('./src/string-functions');
const { findMaximum, findMinimum, sumOfArray, filterArray } = require('./src/array-functions');
const { factorial, factorialBig, isPrime, fibonacci } = require('./src/math-functions');

let passed = 0;
let failed = 0;

/** Runs one test and prints a tick or a cross. */
function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  [32m✓[0m ${name}`);
  } catch (error) {
    failed += 1;
    console.log(`  [31m✗[0m ${name}`);
    console.log(`      ${error.message.split('\n')[0]}`);
  }
}

function group(title) {
  console.log(`\n[1m${title}[0m`);
}

/* --------------------------------------------------------------------------
   1. String functions
   -------------------------------------------------------------------------- */
group('reverseString');
test('reverses a simple word', () => {
  assert.strictEqual(reverseString('hello'), 'olleh');
});
test('reverses a longer string', () => {
  assert.strictEqual(reverseString('JavaScript'), 'tpircSavaJ');
});
test('returns an empty string unchanged', () => {
  assert.strictEqual(reverseString(''), '');
});
test('keeps a palindrome identical', () => {
  assert.strictEqual(reverseString('level'), 'level');
});
test('handles multi-byte characters without corrupting them', () => {
  assert.strictEqual(reverseString('ab👋'), '👋ba');
});
test('rejects a non-string argument', () => {
  assert.throws(() => reverseString(123), TypeError);
});

group('countCharacters');
test('counts characters in a word', () => {
  assert.strictEqual(countCharacters('hello'), 5);
});
test('counts spaces by default', () => {
  assert.strictEqual(countCharacters('hello world'), 11);
});
test('can exclude spaces', () => {
  assert.strictEqual(countCharacters('hello world', { includeSpaces: false }), 10);
});
test('counts an empty string as 0', () => {
  assert.strictEqual(countCharacters(''), 0);
});
test('counts an emoji as one character', () => {
  assert.strictEqual(countCharacters('👋'), 1);
});

group('capitalizeWords');
test('capitalizes each word', () => {
  assert.strictEqual(capitalizeWords('hello world'), 'Hello World');
});
test('capitalizes a longer sentence', () => {
  assert.strictEqual(capitalizeWords('the quick brown fox'), 'The Quick Brown Fox');
});
test('cleans up shouty input', () => {
  assert.strictEqual(capitalizeWords('hELLO wORLD'), 'Hello World');
});
test('preserves multiple spaces between words', () => {
  assert.strictEqual(capitalizeWords('hello   world'), 'Hello   World');
});
test('handles a single word', () => {
  assert.strictEqual(capitalizeWords('javascript'), 'Javascript');
});
test('returns an empty string unchanged', () => {
  assert.strictEqual(capitalizeWords(''), '');
});

/* --------------------------------------------------------------------------
   2. Array functions
   -------------------------------------------------------------------------- */
group('findMaximum / findMinimum');
test('finds the maximum', () => {
  assert.strictEqual(findMaximum([3, 7, 2, 9, 4]), 9);
});
test('finds the minimum', () => {
  assert.strictEqual(findMinimum([3, 7, 2, 9, 4]), 2);
});
test('handles all-negative arrays', () => {
  assert.strictEqual(findMaximum([-5, -2, -10]), -2);
  assert.strictEqual(findMinimum([-5, -2, -10]), -10);
});
test('handles a single-element array', () => {
  assert.strictEqual(findMaximum([42]), 42);
  assert.strictEqual(findMinimum([42]), 42);
});
test('handles decimals', () => {
  assert.strictEqual(findMaximum([1.5, 1.75, 1.25]), 1.75);
});
test('throws on an empty array instead of returning -Infinity', () => {
  assert.throws(() => findMaximum([]), Error);
  assert.throws(() => findMinimum([]), Error);
});
test('survives a very large array (no stack overflow)', () => {
  const big = Array.from({ length: 200000 }, (_, i) => i);
  assert.strictEqual(findMaximum(big), 199999);
  assert.strictEqual(findMinimum(big), 0);
});
test('rejects non-numeric elements', () => {
  assert.throws(() => findMaximum([1, 'two', 3]), TypeError);
});

group('sumOfArray');
test('adds up a list of numbers', () => {
  assert.strictEqual(sumOfArray([1, 2, 3, 4, 5]), 15);
});
test('returns 0 for an empty array', () => {
  assert.strictEqual(sumOfArray([]), 0);
});
test('handles negative numbers', () => {
  assert.strictEqual(sumOfArray([10, -3, -2]), 5);
});
test('handles decimals', () => {
  assert.strictEqual(sumOfArray([0.5, 0.25, 0.25]), 1);
});

group('filterArray');
test('keeps even numbers', () => {
  assert.deepStrictEqual(filterArray([1, 2, 3, 4, 5, 6], (n) => n % 2 === 0), [2, 4, 6]);
});
test('keeps long words', () => {
  assert.deepStrictEqual(filterArray(['ant', 'bee', 'spider'], (w) => w.length > 3), ['spider']);
});
test('filters objects by a property', () => {
  const users = [{ active: true, name: 'A' }, { active: false, name: 'B' }];
  assert.deepStrictEqual(filterArray(users, (u) => u.active), [{ active: true, name: 'A' }]);
});
test('can use the index argument', () => {
  assert.deepStrictEqual(filterArray(['a', 'b', 'c', 'd'], (_, i) => i % 2 === 0), ['a', 'c']);
});
test('returns an empty array when nothing matches', () => {
  assert.deepStrictEqual(filterArray([1, 3, 5], (n) => n % 2 === 0), []);
});
test('does not modify the original array', () => {
  const original = [1, 2, 3, 4];
  filterArray(original, (n) => n > 2);
  assert.deepStrictEqual(original, [1, 2, 3, 4]);
});
test('requires a function as the condition', () => {
  assert.throws(() => filterArray([1, 2], 'not a function'), TypeError);
});

/* --------------------------------------------------------------------------
   3. Mathematical functions
   -------------------------------------------------------------------------- */
group('factorial');
test('factorial(0) is 1', () => {
  assert.strictEqual(factorial(0), 1);
});
test('factorial(1) is 1', () => {
  assert.strictEqual(factorial(1), 1);
});
test('factorial(5) is 120', () => {
  assert.strictEqual(factorial(5), 120);
});
test('factorial(10) is 3628800', () => {
  assert.strictEqual(factorial(10), 3628800);
});
test('rejects negative input', () => {
  assert.throws(() => factorial(-1), RangeError);
});
test('rejects a decimal', () => {
  assert.throws(() => factorial(2.5), TypeError);
});
test('BigInt version stays exact past 20!', () => {
  assert.strictEqual(factorialBig(21), 51090942171709440000n);
});

group('isPrime');
test('2 and 3 are prime', () => {
  assert.strictEqual(isPrime(2), true);
  assert.strictEqual(isPrime(3), true);
});
test('17 and 97 are prime', () => {
  assert.strictEqual(isPrime(17), true);
  assert.strictEqual(isPrime(97), true);
});
test('1, 0 and negatives are not prime', () => {
  assert.strictEqual(isPrime(1), false);
  assert.strictEqual(isPrime(0), false);
  assert.strictEqual(isPrime(-7), false);
});
test('composite numbers are not prime', () => {
  assert.strictEqual(isPrime(20), false);
  assert.strictEqual(isPrime(91), false); // 7 x 13, catches naive checks
});
test('25 and 49 are not prime (perfect squares)', () => {
  assert.strictEqual(isPrime(25), false);
  assert.strictEqual(isPrime(49), false);
});
test('a decimal is not prime', () => {
  assert.strictEqual(isPrime(7.5), false);
});
test('agrees with a brute-force check for every number up to 200', () => {
  const bruteForce = (n) => {
    if (n < 2) return false;
    for (let d = 2; d < n; d += 1) if (n % d === 0) return false;
    return true;
  };
  for (let n = -5; n <= 200; n += 1) {
    assert.strictEqual(isPrime(n), bruteForce(n), `mismatch at ${n}`);
  }
});

group('fibonacci');
test('0 terms gives an empty array', () => {
  assert.deepStrictEqual(fibonacci(0), []);
});
test('1 term gives [0]', () => {
  assert.deepStrictEqual(fibonacci(1), [0]);
});
test('2 terms gives [0, 1]', () => {
  assert.deepStrictEqual(fibonacci(2), [0, 1]);
});
test('10 terms gives the expected sequence', () => {
  assert.deepStrictEqual(fibonacci(10), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
});
test('every term is the sum of the previous two', () => {
  const sequence = fibonacci(30);
  for (let i = 2; i < sequence.length; i += 1) {
    assert.strictEqual(sequence[i], sequence[i - 1] + sequence[i - 2]);
  }
});
test('rejects a negative number of terms', () => {
  assert.throws(() => fibonacci(-3), RangeError);
});

/* --------------------------------------------------------------------------
   Summary
   -------------------------------------------------------------------------- */
console.log(`\n[1mResult:[0m ${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
