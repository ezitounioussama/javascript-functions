# JavaScript Functions — Checkpoint

Nine JavaScript functions across three categories: strings, arrays and maths. The functions
themselves are small — the useful part of the exercise was the edge cases, because most of these
have an obvious one-line version that quietly breaks. `Math.max(...arr)` throws on a large array,
`split('')` corrupts emoji, `Math.max()` on an empty array returns `-Infinity` and poisons the
arithmetic downstream. Each function here picks the version that doesn't, and there's a test
holding it in place.

```bash
node tests.js   # 56 passed, 0 failed
node demo.js    # every function running on sample input
```

No `npm install` — the tests use Node's built-in `assert`.

## Also in this repo

- **[NOTES.md](NOTES.md)** — all nine functions with examples, and why each one is written the
  way it is

---

Author: **Oussama Ezitouni**
