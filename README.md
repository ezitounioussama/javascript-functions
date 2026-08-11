# JavaScript Functions — Checkpoint

Nine JavaScript functions across three categories: string manipulation, arrays and
mathematics. Every function is commented, handles its edge cases, and is covered by tests.

## Files

| File | Contents |
|---|---|
| `src/string-functions.js` | `reverseString`, `countCharacters`, `capitalizeWords` |
| `src/array-functions.js` | `findMaximum`, `findMinimum`, `sumOfArray`, `filterArray` |
| `src/math-functions.js` | `factorial`, `factorialBig`, `isPrime`, `fibonacci` |
| `tests.js` | 56 tests, no dependencies |
| `demo.js` | Prints every function running on sample input |

## Running it

```bash
node tests.js   # run the test suite  → 56 passed, 0 failed
node demo.js    # see every function in action
```

No `npm install` needed — the tests use Node's built-in `assert` module.

---

## 1. String manipulation

### `reverseString(str)`
Reverses a string.

```js
reverseString('hello')      // 'olleh'
reverseString('JavaScript') // 'tpircSavaJ'
reverseString('')           // ''
```

Uses `Array.from(str)` rather than `str.split('')`. `split('')` breaks a string into UTF-16
code units, which corrupts emoji and some accented characters; `Array.from` iterates whole
characters, so `reverseString('ab👋')` correctly gives `'👋ba'` instead of a broken symbol.

### `countCharacters(str, options)`
Counts the characters in a string. Spaces count by default.

```js
countCharacters('hello')                                  // 5
countCharacters('hello world')                            // 11
countCharacters('hello world', { includeSpaces: false })  // 10
```

The brief doesn't say whether spaces should count, so the default counts everything and an
option covers the other reading.

### `capitalizeWords(sentence)`
Capitalizes the first letter of each word.

```js
capitalizeWords('the quick brown fox') // 'The Quick Brown Fox'
capitalizeWords('hELLO wORLD')         // 'Hello World'
capitalizeWords('hello   world')       // 'Hello   World'  (spacing preserved)
```

Implemented with `sentence.replace(/\S+/g, ...)` instead of `split(' ')` + `join(' ')`,
because splitting on a single space collapses double spaces, tabs and newlines. The rest of
each word is lowercased so shouty input gets tidied up.

---

## 2. Arrays

### `findMaximum(numbers)` / `findMinimum(numbers)`
Finds the largest and smallest value.

```js
findMaximum([3, 7, 2, 9, 4])  // 9
findMinimum([3, 7, 2, 9, 4])  // 2
findMaximum([-5, -2, -10])    // -2
```

Two deliberate choices:

- **`reduce`, not `Math.max(...numbers)`.** Spreading an array passes every element as a
  separate argument, which throws `Maximum call stack size exceeded` at roughly 100k
  elements. `reduce` has no such limit — there's a test with a 200,000-element array.
- **An empty array throws.** `Math.max()` with no arguments returns `-Infinity`, which
  silently poisons later arithmetic. A clear error is more useful than a wrong number.

### `sumOfArray(numbers)`
Adds up every element.

```js
sumOfArray([1, 2, 3, 4, 5])  // 15
sumOfArray([])               // 0
```

The `0` seed matters: without it, `reduce` throws on an empty array, and the sum of nothing
is sensibly zero.

### `filterArray(array, condition)`
Filters an array using a condition you pass in.

```js
filterArray([1, 2, 3, 4, 5, 6], n => n % 2 === 0)      // [2, 4, 6]
filterArray(['ant', 'bee', 'spider'], w => w.length > 3) // ['spider']
filterArray(users, u => u.active)                       // only active users
```

Taking the condition as a function (a predicate) means one function covers every rule
instead of writing `filterEvens`, `filterLongWords` and so on. The predicate receives
`(element, index, array)` just like `Array.filter`, so it can use the index too. The
original array is never modified.

---

## 3. Mathematics

### `factorial(n)`
Calculates `n!`.

```js
factorial(0)  // 1
factorial(5)  // 120
factorial(10) // 3628800
```

Written as a loop, not recursion — recursion hits the call-stack limit around n = 10000.
Negative numbers throw a `RangeError`, decimals throw a `TypeError`, and `factorial(0)` is
`1` by definition (the empty product).

**Precision:** JavaScript numbers are 64-bit floats, so results are exact only up to `20!`.
For anything larger, `factorialBig(n)` does the same job with `BigInt`:

```js
factorialBig(21) // 51090942171709440000n  (exact)
factorial(21)    // 51090942171709440000   (already rounded)
```

### `isPrime(n)`
Checks whether a number is prime.

```js
isPrime(2)   // true
isPrime(17)  // true
isPrime(1)   // false
isPrime(91)  // false  (7 × 13)
```

Two optimisations keep the loop short:

1. **Only test up to `√n`.** If `n = a × b`, one factor is always at or below `√n`, so a
   larger divisor would already have been caught.
2. **Step by 6.** Every prime above 3 sits at `6k ± 1`, so after handling 2 and 3 the loop
   tests only those two positions and skips two thirds of the candidates.

Correctness isn't taken on trust: a test compares `isPrime` against a brute-force
trial-division check for every number from −5 to 200.

### `fibonacci(terms)`
Generates the sequence up to a given number of terms.

```js
fibonacci(0)  // []
fibonacci(1)  // [0]
fibonacci(10) // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

Built from the bottom up, so generating `n` terms costs `n` steps. The naive recursive
version recomputes the same terms repeatedly and is exponentially slow — `fib(40)` alone
takes over a billion calls.

---

## Test coverage

`node tests.js` → **56 passed, 0 failed**

The suite covers the normal cases plus the ones that actually break implementations: empty
strings and arrays, single-element arrays, negative numbers, decimals, multi-byte
characters, multiple consecutive spaces, `isPrime(1)`, perfect squares like 25 and 49,
semiprimes like 91, a 200,000-element array, and wrong argument types.

---

Author: **Oussama Ezitouni**
