/* ==========================================================================
   Demo — run with:  node demo.js
   Shows every function working on sample input.
   ========================================================================== */

const { reverseString, countCharacters, capitalizeWords } = require('./src/string-functions');
const { findMaximum, findMinimum, sumOfArray, filterArray } = require('./src/array-functions');
const { factorial, isPrime, fibonacci } = require('./src/math-functions');

const line = (label, value) => console.log(`  ${label.padEnd(52)} ${value}`);

console.log('\n=== 1. STRING MANIPULATION ===\n');
line('reverseString("hello")', reverseString('hello'));
line('reverseString("JavaScript")', reverseString('JavaScript'));
line('countCharacters("hello world")', countCharacters('hello world'));
line(
  'countCharacters("hello world", {includeSpaces:false})',
  countCharacters('hello world', { includeSpaces: false })
);
line('capitalizeWords("the quick brown fox")', capitalizeWords('the quick brown fox'));
line('capitalizeWords("hELLO wORLD")', capitalizeWords('hELLO wORLD'));

console.log('\n=== 2. ARRAYS ===\n');
const numbers = [3, 7, 2, 9, 4];
line(`findMaximum([${numbers}])`, findMaximum(numbers));
line(`findMinimum([${numbers}])`, findMinimum(numbers));
line(`sumOfArray([${numbers}])`, sumOfArray(numbers));
line(
  'filterArray([1..6], n => n % 2 === 0)',
  `[${filterArray([1, 2, 3, 4, 5, 6], (n) => n % 2 === 0)}]`
);
line(
  'filterArray(["ant","bee","spider"], w => w.length > 3)',
  `[${filterArray(['ant', 'bee', 'spider'], (w) => w.length > 3)}]`
);

console.log('\n=== 3. MATHEMATICS ===\n');
line('factorial(0)', factorial(0));
line('factorial(5)', factorial(5));
line('factorial(10)', factorial(10));
line('isPrime(17)', isPrime(17));
line('isPrime(20)', isPrime(20));
line('isPrime(1)', isPrime(1));
// Combining two of the functions: filter a range of numbers by isPrime.
const range = Array.from({ length: 30 }, (_, i) => i);
line('primes below 30', `[${filterArray(range, isPrime)}]`);
line('fibonacci(10)', `[${fibonacci(10)}]`);
line('fibonacci(15)', `[${fibonacci(15)}]`);

console.log('');
