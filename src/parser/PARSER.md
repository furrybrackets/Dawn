# 🎓 Parser directory

Directory housing the Parser of the Dawn language

> ## Directory Information
>
> Name: `parser/`
>
> Utility: Parser utils for Dawn's frontend.
>
> Dependents: `main.ts`, `gen.ts`, `passes/`

### Exports

#### `parse.ts`

Main parser file, used for parsing the input file(s).

```typescript
import { ParserOptions, AST } from "./types.js";
export declare enum Tokens {
    ILLEGAL = "ILLEGAL",
    EOF = "EOF",
    IDENT = "IDENT",
    NUMBER = "NUMBER",
    STRING = "STRING",
    INC = "INC",
    DEC = "DEC",
    PLUS = "PLUS",
    MINUS = "MINUS",
    MUL = "MUL",
    DIV = "DIV",
    MOD = "MOD",
    EXP = "EXP",
    BITWISE_AND = "BITWISE_AND",
    BITWISE_OR = "BITWISE_OR",
    BITWISE_XOR = "BITWISE_XOR",
    BITWISE_NOT = "BITWISE_NOT",
    BITWISE_SHIFT_LEFT = "BITWISE_SHIFT_LEFT",
    BITWISE_SHIFT_RIGHT = "BITWISE_SHIFT_RIGHT",
    LOGICAL_AND = "LOGICAL_AND",
    LOGICAL_OR = "LOGICAL_OR",
    LOGICAL_NOT = "LOGICAL_NOT",
    LOGICAL_XOR = "LOGICAL_XOR",
    EQUAL = "EQUAL",
    NOT_EQUAL = "NOT_EQUAL",
    LESS_THAN = "LESS_THAN",
    LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL",
    GREATER_THAN = "GREATER_THAN",
    GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
    ASSIGN = "ASSIGN",
    ASSIGN_ADD = "ASSIGN_ADD",
    ASSIGN_SUB = "ASSIGN_SUB",
    ASSIGN_MUL = "ASSIGN_MUL",
    ASSIGN_DIV = "ASSIGN_DIV",
    ASSIGN_MOD = "ASSIGN_MOD",
    ASSIGN_EXP = "ASSIGN_EXP",
    ASSIGN_BITWISE_AND = "ASSIGN_BITWISE_AND",
    ASSIGN_BITWISE_OR = "ASSIGN_BITWISE_OR",
    ASSIGN_BITWISE_XOR = "ASSIGN_BITWISE_XOR",
    ASSIGN_BITWISE_NOT = "ASSIGN_BITWISE_NOT",
    ASSIGN_BITWISE_SHIFT_LEFT = "ASSIGN_BITWISE_SHIFT_LEFT",
    ASSIGN_BITWISE_SHIFT_RIGHT = "ASSIGN_BITWISE_SHIFT_RIGHT",
    ASSIGN_LOGICAL_AND = "ASSIGN_LOGICAL_AND",
    ASSIGN_LOGICAL_OR = "ASSIGN_LOGICAL_OR",
    ASSIGN_LOGICAL_NOT = "ASSIGN_LOGICAL_NOT",
    ASSIGN_LOGICAL_XOR = "ASSIGN_LOGICAL_XOR",
    COMMA = "COMMA",
    SEMICOLON = "SEMICOLON",
    COLON = "COLON",
    DOT = "DOT",
    QUESTION_MARK = "QUESTION_MARK",
    LEFT_PAREN = "LEFT_PAREN",
    RIGHT_PAREN = "RIGHT_PAREN",
    LEFT_BRACE = "LEFT_BRACE",
    RIGHT_BRACE = "RIGHT_BRACE",
    LEFT_BRACKET = "LEFT_BRACKET",
    RIGHT_BRACKET = "RIGHT_BRACKET",
    LEFT_ANGLE_BRACKET = "LEFT_ANGLE_BRACKET",
    RIGHT_ANGLE_BRACKET = "RIGHT_ANGLE_BRACKET",
    LEFT_ARROW = "LEFT_ARROW",
    RIGHT_ARROW = "RIGHT_ARROW",
    HASHTAG = "HASHTAG",
    BACKTICK = "BACKTICK",
    DECORATOR = "DECORATOR",
    IF = "IF",
    ELSE = "ELSE",
    FOR = "FOR",
    WHILE = "WHILE",
    FUNCTION = "FUNCTION",
    RETURN = "RETURN",
    CONTINUE = "CONTINUE",
    BREAK = "BREAK",
    LET = "LET",
    CONST = "CONST",
    TRUE = "TRUE",
    FALSE = "FALSE",
    VOID = "VOID",
    NULL = "NULL",
    NEW = "NEW",
    THIS = "THIS",
    SUPER = "SUPER",
    CLASS = "CLASS",
    EXTENDS = "EXTENDS",
    IMPLEMENTS = "IMPLEMENTS",
    STATIC = "STATIC",
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    INTERFACE = "INTERFACE",
    SWITCH = "SWITCH",
    CASE = "CASE",
    DEFAULT = "DEFAULT",
    IMPORT = "IMPORT",
    FROM = "FROM",
    AS = "AS",
    TYPE = "TYPE",
    ENUM = "ENUM",
    EXTERN = "EXTERN",
    EXPORT = "EXPORT",
    DELETE = "DELETE",
    TYPEOF = "TYPEOF",
    IN = "IN",
    INSTANCEOF = "INSTANCEOF",
    THROW = "THROW",
    YEET = "YEET",
    TRY = "TRY",
    CATCH = "CATCH",
    INTTYPE = "INT",
    UNSIGNEDINT = "UNSIGNED_INT",
    FLOATTYPE = "FLOAT",
    UNSIGNEDFLOAT = "UNSIGNED_FLOAT",
    FLOAT128TYPE = "FLOAT128",
    STRINGTYPE = "STRING",
    BOOLTYPE = "BOOL",
    FRACTIONTYPE = "FRACTION",
    VECTORTYPE = "VECTOR",
    MATRIXTYPE = "MATRIX",
    CHARTYPE = "CHAR",
    UNICODECHARTYPE = "UNICODE_CHAR",
    POLYNOMIALTYPE = "POLYNOMIAL",
    ARBFLOATTYPE = "ARBFLOAT",
    ARBINTTYPE = "ARBINT",
    CSTRINGTYPE = "CSTRING",
    COMMENT = "COMMENT"
}
export interface Position {
    line: number;
    column: number;
    pos: number;
}
export interface Token {
    type: Tokens;
    value: string;
    start?: Position;
    end?: Position;
}
export declare function CreateToken(type: Tokens, value: string, start: Position, end: Position): Token;
export declare function StringToKeyword(str: string, start: Position, end?: Position): Token;
export declare class Tokenizer {
    private readonly source;
    private tokens;
    private readPos;
    private line;
    private column;
    private char;
    private pos;
    constructor(source: string);
    read(): void;
    synthPos(): Position;
    makeToken(type: Tokens, value: string, start: Position, end?: Position): Token;
    skipWhitespace(): void;
    nextToken(): Token;
    isAlphaNum(char: string): boolean;
    isAlphaOrGreek(char: string): boolean;
    readIdentifier(): Token;
    readNumber(): Token;
    isNumber(char: string): boolean;
    tokenize(): Token[];
}
export declare class Parser {
    code: string;
    tokens: Tokens[];
    pos: number;
    constructor(code: string, options: ParserOptions);
    parse(): AST;
}
```

#### `textgen.ts`

Used when generating a file from the AST (useful for transformation of source code)

```typescript
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

#### `generator.ts`

Used to generate an AST from scratch, adding nodes to the AST.

```typescript
export default class Generator {
   Type constructor(options: GeneratorOptions) {
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

#### `types.ts`

Exports helper types for the other files.

```typescript
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

### `Parser`

Parser class.

```typescript
export class Parser {
    // ...
}
```

### Options:

> ## `parseComments`
>
> Whether it should generate a `CommentNode` for each comment in the source code.
>
> _Default: `false`_
>
> _Type: `boolean`_

> ## `exceptionDirectives`
>
> Whether it should not parse comments except directives: `@`(**`ch...`**) or `//@` (**`ch...`**)
>
> _Default: `false`_
>
> _Type: `boolean`_

> ## `generateComplexTree`
>
> Whether it should perform a pass on the simple AST to generate a more complex AST. (useful for desugaring).
>
> _Default: `false`_
>
> _Type: `boolean`_

> ## `positions`
>
> Object defining options for adding the position of the object in the source code.
>
> ### `range`
>
> Whether it should add the start and end of the object in the source code.
>
> _Default: `false`_
>
> _Type: `boolean`_
>
> ### `start`
>
> Whether it should add the start of the object in the source code.
>
> _Default: `false`_
>
> _Type: `boolean`_

### Output:

> ## `AST`
>
> The AST generated from the source code.
>
> _Type: `AST`_
