/* ==========================================================================
   1. STRING MANIPULATION FUNCTIONS
   ========================================================================== */

/**
 * Reverses a given string.
 *
 * Note on Array.from: the obvious version is str.split('').reverse().join(''),
 * but split('') cuts a string into UTF-16 code units, which breaks emoji and
 * accented characters built from surrogate pairs. Array.from (and the spread
 * operator) iterate by whole characters instead, so "héllo 👋" survives.
 *
 * @param {string} str - the string to reverse
 * @returns {string} the reversed string
 *
 * reverseString("hello")  ➞ "olleh"
 * reverseString("JavaScript") ➞ "tpircSavaJ"
 * reverseString("")       ➞ ""
 */
function reverseString(str) {
  if (typeof str !== 'string') {
    throw new TypeError('reverseString expects a string');
  }
  return Array.from(str).reverse().join('');
}

/**
 * Counts the number of characters in a string.
 *
 * By default every character counts, including spaces. Pass
 * { includeSpaces: false } to count only the visible characters.
 *
 * @param {string} str - the string to measure
 * @param {object} [options]
 * @param {boolean} [options.includeSpaces=true] - count whitespace or not
 * @returns {number} how many characters the string contains
 *
 * countCharacters("hello")        ➞ 5
 * countCharacters("hello world")  ➞ 11
 * countCharacters("hello world", { includeSpaces: false }) ➞ 10
 */
function countCharacters(str, options = {}) {
  if (typeof str !== 'string') {
    throw new TypeError('countCharacters expects a string');
  }

  const { includeSpaces = true } = options;
  const characters = Array.from(str);

  if (includeSpaces) {
    return characters.length;
  }

  return characters.filter((char) => !/\s/.test(char)).length;
}

/**
 * Capitalizes the first letter of each word in a sentence.
 *
 * The regex /\S+/g matches runs of non-space characters, which means the
 * original spacing is preserved exactly — double spaces, tabs and newlines
 * all stay where they were. Splitting on ' ' and re-joining would flatten them.
 *
 * The rest of each word is lowercased so that shouty input is cleaned up:
 * "hELLO wORLD" ➞ "Hello World".
 *
 * @param {string} sentence - the sentence to capitalize
 * @returns {string} the sentence in title case
 *
 * capitalizeWords("hello world")        ➞ "Hello World"
 * capitalizeWords("the quick brown fox") ➞ "The Quick Brown Fox"
 * capitalizeWords("hELLO wORLD")        ➞ "Hello World"
 */
function capitalizeWords(sentence) {
  if (typeof sentence !== 'string') {
    throw new TypeError('capitalizeWords expects a string');
  }

  return sentence.replace(
    /\S+/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

module.exports = { reverseString, countCharacters, capitalizeWords };
