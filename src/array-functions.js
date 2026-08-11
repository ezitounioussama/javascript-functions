/* ==========================================================================
   2. ARRAY FUNCTIONS
   ========================================================================== */

/**
 * Internal guard: every function here needs a non-empty array of numbers,
 * so the check lives in one place instead of being repeated four times.
 */
function assertNumberArray(value, functionName) {
  if (!Array.isArray(value)) {
    throw new TypeError(`${functionName} expects an array`);
  }
  if (value.some((item) => typeof item !== 'number' || Number.isNaN(item))) {
    throw new TypeError(`${functionName} expects an array of numbers`);
  }
}

/**
 * Finds the maximum value in an array of numbers.
 *
 * Why reduce instead of Math.max(...numbers): the spread operator passes every
 * element as a separate argument, which throws "Maximum call stack size
 * exceeded" on very large arrays (roughly 100k+ elements). reduce walks the
 * array one element at a time and has no such limit.
 *
 * An empty array throws rather than returning -Infinity, which is what
 * Math.max() gives you and which is almost never what the caller wanted.
 *
 * @param {number[]} numbers - array of numbers to search
 * @returns {number} the largest value
 *
 * findMaximum([3, 7, 2, 9, 4]) ➞ 9
 * findMaximum([-5, -2, -10])   ➞ -2
 */
function findMaximum(numbers) {
  assertNumberArray(numbers, 'findMaximum');
  if (numbers.length === 0) {
    throw new Error('findMaximum cannot work on an empty array');
  }

  return numbers.reduce((largest, current) => (current > largest ? current : largest));
}

/**
 * Finds the minimum value in an array of numbers.
 *
 * @param {number[]} numbers - array of numbers to search
 * @returns {number} the smallest value
 *
 * findMinimum([3, 7, 2, 9, 4]) ➞ 2
 * findMinimum([-5, -2, -10])   ➞ -10
 */
function findMinimum(numbers) {
  assertNumberArray(numbers, 'findMinimum');
  if (numbers.length === 0) {
    throw new Error('findMinimum cannot work on an empty array');
  }

  return numbers.reduce((smallest, current) => (current < smallest ? current : smallest));
}

/**
 * Calculates the sum of all elements in an array.
 *
 * The starting value 0 matters: without it, reduce on an empty array throws,
 * and the sum of nothing is sensibly 0.
 *
 * @param {number[]} numbers - array of numbers to add up
 * @returns {number} the total
 *
 * sumOfArray([1, 2, 3, 4, 5]) ➞ 15
 * sumOfArray([])              ➞ 0
 */
function sumOfArray(numbers) {
  assertNumberArray(numbers, 'sumOfArray');
  return numbers.reduce((total, current) => total + current, 0);
}

/**
 * Filters elements out of an array based on a given condition.
 *
 * The condition is passed in as a function (a "predicate"), so one filter
 * works for every rule: keep even numbers, keep long words, keep active users.
 * The predicate receives (element, index, array) exactly like Array.filter,
 * so it can use the index too.
 *
 * @param {Array} array - the array to filter
 * @param {Function} condition - returns true for elements to keep
 * @returns {Array} a new array with only the elements that passed
 *
 * filterArray([1, 2, 3, 4, 5, 6], n => n % 2 === 0) ➞ [2, 4, 6]
 * filterArray(["ant", "bee", "spider"], w => w.length > 3) ➞ ["spider"]
 */
function filterArray(array, condition) {
  if (!Array.isArray(array)) {
    throw new TypeError('filterArray expects an array');
  }
  if (typeof condition !== 'function') {
    throw new TypeError('filterArray expects a function as its condition');
  }

  return array.filter(condition);
}

module.exports = { findMaximum, findMinimum, sumOfArray, filterArray };
