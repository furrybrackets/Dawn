# Dawn
Dawn is a compiled language with major similarities to TypeScript.

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
