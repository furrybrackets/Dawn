# Dawn
Dawn is a compiled language with major similarities to ECMAScript.

## Syntax
Dawn alleviates type-errors with a complicated and an in-depth typing system.

```ts
import { fraction, string } from "std::types";
import { print, scan } from "std::io";
import { toFrac } from "std::string";

class Point {
  x: fraction;
  y: fraction;
  constructor(point: string) {
    // check if point is (a/b, c/d)
    let arr = point.replace(['(', ')'], '').split(',');
    // array size is fixed
    if (arr.length() == 2) {
      // zero-cost spreading
      print("({s}, {s})", arr[0], arr[1]);
      // fraction-ize
      this.x = toFrac(arr[0]);
      this.y = toFrac(arr[1]);
    };
  }
};
```

Dawn also has support for structs:
```rust
struct MyDawn {
  a: int;
  b: string;
};
```

Pointers:
```rust
const arr = &myVar;
// dereference
*arr;
```

Node.js-style STL:
```ts
import { readFile, FileData } from "std::fs"; // with fs-extra features, too.
import { print } from "std::io";
import { Error } from "std::error";
readFile("./someFile.js", (err: Error, dat: FileData) => {
  if (err) {
    yeet err; // or: "throw err"
  } else {
    print("{}", dat.toString());
  }
})
```

## Compilation Passes
Passes are different steps which modify the source code. Dawn follows an expand-resolve scheme. This means that Dawn will first desugar your source code and then compile it.

## Pass 1: Explicit Typing
Dawn will explicitly type all your source code.
*Example*
```ts
const x = 10;
```
Becomes:
```ts
const x: int = 10;
```

## Pass 2: Glorious Anonymous Functions (arrow-functions)
```ts
const x = (a: int, b: int) => {
  return a*b;
}
x(2,10);
```
Becomes:
```c
// namespace
const x = {
  function call(a: int, b: int) {
    return a*b;
  };
};
x::call(2,10);
```
## Pass 3: Code-splitting
Self-explanatory. Imports code and tree-shakes it.

## Pass 4: Anonymous Function Resolution
When passing an anonymous function as an argument, it needs to be resolved.

## Pass 5: LLVM-IR Gen
Generate LLVM-IR.

## Pass 6: Optimization
Optimize the IR code.

## Pass 7: Compilation
Compile the code
