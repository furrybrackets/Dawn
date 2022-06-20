# Parser for Dawn
Parser utilities for the Dawn language.

## Exports
### `parse.ts`
Main parser file, used for parsing the input file(s).
```ts
export class Parser {
    constructor(code: string, options: ParserOptions) {
        // ...
    }

    parse(): AST {
        // ...
        return ast;
    };
};

export class Tokenizer {
    constructor(code: string) {
        // ...
    }
};

export enum Tokens {
    // ...
};

export interface Token {
    type: Tokens;
    value: string;
    start?: {
        line: number;
        column: number;
        pos: number;
    },
    end?: {
        line: number;
        column: number;
        pos: number;
    }
};

export function CreateToken(type: Tokens, value: string, start: { line: number, column: number, pos: number }, end: { line: number, column: number, pos: number }): Token {
    return {
        type: type,
        value: value,
        start: start,
        end: end
    };
};
```

### `textgen.ts`
Used when generating a file from the AST (useful for transformation of source code)
```ts
export default class TextGenerator {
    constructor(ast: AST, options: TextGeneratorOptions) {
        // ...
    }

    generate(): string {
        // ...
        return text;
    };
};
```
### `generator.ts`
Used to generate an AST from scratch, adding nodes to the AST.
```ts
export default class Generator {
    constructor(options: GeneratorOptions) {
        // ...
    }

    // MakeFunc() -> ASTFunction, etc.

    gen(): AST {
        // ...
        return ast;
    };

    getText(): string {
        // ...
        return text;
    };
}
```


### `types.ts`
Exports helper types for the other files.
```ts
export interface ParserOptions {
    parseComments: boolean, // default false
    exceptionDirectives: boolean, // default false
    generateComplexTree: boolean, // default false
    positions: {
        range: boolean, // default false
        start: boolean // default false
    }
};

export interface TextGeneratorOptions {
    comments: boolean, // default false
    generateTypeFiles: boolean, // default false
    simplifyTree: boolean // default true
};

export interface GeneratorOptions {
    complexAST: boolean // default false
};

export class AST {
    // ...
};
```

## `Parser`
Parser class.
```ts
export class Parser {
    // ...
}
```

## Options:

> # `parseComments`
> Whether it should generate a `CommentNode` for each comment in the source code.
>
> *Default: `false`*
>
> *Type: `boolean`*

> # `exceptionDirectives`
> Whether it should not parse comments except directives: `@`(**`ch...`**) or `//@` (**`ch...`**)
>
> *Default: `false`*
>
> *Type: `boolean`*

> # `generateComplexTree`
> Whether it should perform a pass on the simple AST to generate a more complex AST. (useful for desugaring).
>
> *Default: `false`*
>
> *Type: `boolean`*

> # `positions`
> Object defining options for adding the position of the object in the source code.
>
> ## `range`
> Whether it should add the start and end of the object in the source code.
>
> *Default: `false`*
>
> *Type: `boolean`*
>
> ## `start`
> Whether it should add the start of the object in the source code.
>
> *Default: `false`*
>
> *Type: `boolean`*

## Output:

> # `AST`
> The AST generated from the source code.
>
> *Type: `AST`*

