# Python to JavaScript cheat sheet

| Idea | Python | JavaScript |
| --- | --- | --- |
| Print output | `print(x)` | `console.log(x)` |
| Variable that never changes | (convention only) `PI = 3.14` | `const pi = 3.14;` |
| Variable that changes | `count = 0` | `let count = 0;` |
| Comment | `# note` | `// note` |
| End of statement | newline | semicolon `;` (recommended) |
| Blocks | indentation | braces `{ }` |
| Boolean values | `True`, `False` | `true`, `false` |
| Empty value | `None` | `null` (and `undefined` for "never set") |
| And, or, not | `and`, `or`, `not` | `&&`, `\|\|`, `!` |
| Equality | `==` | `===` (always use three equals signs) |
| If / else if / else | `if`, `elif`, `else` | `if`, `else if`, `else` |
| Condition syntax | `if x > 3:` | `if (x > 3) { }` |
| Ternary | `a if cond else b` | `cond ? a : b` |
| String with values | `f"Hi {name}"` | `` `Hi ${name}` `` |
| Length | `len(items)` | `items.length` |
| Last item | `items[-1]` | `items[items.length - 1]` |
| Loop over items | `for x in items:` | `for (const x of items) { }` |
| Counting loop | `for i in range(3):` | `for (let i = 0; i < 3; i++) { }` |
| While loop | `while x < 5:` | `while (x < 5) { }` |
| Function | `def add(a, b): return a + b` | `function add(a, b) { return a + b; }` |
| Short function | `lambda a: a * 2` | `(a) => a * 2` |
| List / array | `items = [1, 2]` | `const items = [1, 2];` |
| Add to the end | `items.append(3)` | `items.push(3)` |
| Dictionary / object | `{"a": 1}` | `{ a: 1 }` |
| Read a key | `d["a"]` | `obj.a` or `obj["a"]` |
| Keep matching items | `[x for x in items if x > 1]` | `items.filter((x) => x > 1)` |
| Transform every item | `[x * 2 for x in items]` | `items.map((x) => x * 2)` |
| First match | `next(x for x in items if x > 1)` | `items.find((x) => x > 1)` |
| Contains | `2 in items` | `items.includes(2)` |
| Text to number | `int("5")`, `float("5.5")` | `Number("5")`, `Number("5.5")` |
| Number to text with decimals | `f"{x:.1f}"` | `x.toFixed(1)` |
| Convert to JSON text | `json.dumps(d)` | `JSON.stringify(obj)` |
| Parse JSON text | `json.loads(s)` | `JSON.parse(s)` |

## Two differences that cause most early errors

1. `===` compares both value and type. `5 === "5"` is `false`. Convert input with `Number(...)` before comparing numbers, because everything read from an input box is text.
2. `sort()` changes the original array. Copy first: `[...items].sort(...)`. `reverse()` also changes the original.
