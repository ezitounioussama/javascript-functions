/* ==========================================================================
   3. MATHEMATICAL FUNCTIONS
   ========================================================================== */

/**
 * Calculates the factorial of a given number.
 *
 * factorial(5) is 5 x 4 x 3 x 2 x 1 = 120, and factorial(0) is 1 by
 * definition (the empty product).
 *
 * This is written as a loop rather than a recursive call because recursion
 * hits the call-stack limit somewhere around n = 10000, while the loop does not.
 *
 * Precision warning: JavaScript numbers are 64-bit floats, so results stay
 * exact only up to 20!. From 21! upward the value is rounded, which is why
 * factorialBig below exists.
 *
 * @param {number} n - a non-negative integer
 * @returns {number} n!
 *
 * factorial(0) ➞ 1
 * factorial(5) ➞ 120
 * factorial(10) ➞ 3628800
 */
function factorial(n) {
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new TypeError('factorial expects an integer');
  }
  if (n < 0) {
    throw new RangeError('factorial is not defined for negative numbers');
  }

  let result = 1;
  for (let i = 2; i <= n; i += 1) {
    result *= i;
  }
  return result;
}

/**
 * Same calculation using BigInt, for when the answer must stay exact
 * beyond 20!. Returns a BigInt, so compare against 120n rather than 120.
 *
 * @param {number} n - a non-negative integer
 * @returns {bigint} n! with no loss of precision
 *
 * factorialBig(21) ➞ 51090942171709440000n
 */
function factorialBig(n) {
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new TypeError('factorialBig expects an integer');
  }
  if (n < 0) {
    throw new RangeError('factorialBig is not defined for negative numbers');
  }

  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i += 1n) {
    result *= i;
  }
  return result;
}

/**
 * Checks whether a number is prime.
 *
 * A prime has exactly two divisors: 1 and itself. The checks below, in order:
 *
 *   - anything below 2 is not prime (so 1, 0 and negatives are out)
 *   - 2 and 3 are prime
 *   - any other multiple of 2 or 3 is not prime
 *   - then test the remaining candidates
 *
 * Two optimisations keep the loop short. First, we only test divisors up to
 * the square root of n: if n = a x b, one of the two factors is always at or
 * below sqrt(n), so a larger divisor would already have been found. Second,
 * every prime above 3 sits at 6k - 1 or 6k + 1, so we step by 6 and test just
 * those two positions, skipping two thirds of the candidates.
 *
 * @param {number} n - the number to test
 * @returns {boolean} true if n is prime
 *
 * isPrime(2)  ➞ true
 * isPrime(17) ➞ true
 * isPrime(1)  ➞ false
 * isPrime(20) ➞ false
 */
function isPrime(n) {
  if (typeof n !== 'number' || Number.isNaN(n)) {
    throw new TypeError('isPrime expects a number');
  }

  // Only whole numbers can be prime.
  if (!Number.isInteger(n)) return false;

  if (n < 2) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let divisor = 5; divisor * divisor <= n; divisor += 6) {
    if (n % divisor === 0 || n % (divisor + 2) === 0) {
      return false;
    }
  }

  return true;
}

/**
 * Generates the Fibonacci sequence up to a given number of terms.
 *
 * Each term is the sum of the two before it, starting from 0 and 1:
 *   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
 *
 * Rather than recursing (which recomputes the same terms over and over and is
 * exponentially slow), this builds the list once from the bottom up, so
 * generating n terms costs n steps.
 *
 * @param {number} terms - how many terms to generate (0 or more)
 * @returns {number[]} an array containing that many Fibonacci numbers
 *
 * fibonacci(0)  ➞ []
 * fibonacci(1)  ➞ [0]
 * fibonacci(2)  ➞ [0, 1]
 * fibonacci(10) ➞ [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 */
function fibonacci(terms) {
  if (typeof terms !== 'number' || !Number.isInteger(terms)) {
    throw new TypeError('fibonacci expects an integer number of terms');
  }
  if (terms < 0) {
    throw new RangeError('fibonacci cannot generate a negative number of terms');
  }

  const sequence = [];

  for (let i = 0; i < terms; i += 1) {
    if (i < 2) {
      // The first two terms are fixed: 0 then 1.
      sequence.push(i);
    } else {
      sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
  }

  return sequence;
}

module.exports = { factorial, factorialBig, isPrime, fibonacci };
