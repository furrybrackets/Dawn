import { ParserOptions, AST } from "./types";

export enum Tokens {
    ILLEGAL = "ILLEGAL",
    EOF = "EOF",
    // Identifiers and literals
    IDENT = "IDENT", // ex: _name, name_thing, _, $verb, va3rw1thn7mb3rs.
    INTEGER = "INTEGER", // 0-9
    STRING = "STRING", // ex: "foo", "bar", "baz", etc.
    FLOAT = "FLOAT", // ex: 1.0, 2.0, 3.0, etc.
    CHAR = "CHAR", // ex: 'a', 'b', 'c', etc.

    // Operators

    /// Arithmetic operators

    //// Unary operators
    INC = "INC", // ++
    DEC = "DEC", // --

    //// Binary operators
    PLUS = "PLUS", // +
    MINUS = "MINUS", // -
    MUL = "MUL", // *
    DIV = "DIV", // /
    MOD = "MOD", // %
    EXP = "EXP", // **
    //// Bitwise operators
    BITWISE_AND = "BITWISE_AND", // &
    BITWISE_OR = "BITWISE_OR", // |
    BITWISE_XOR = "BITWISE_XOR", // ^
    BITWISE_NOT = "BITWISE_NOT", // ~
    BITWISE_SHIFT_LEFT = "BITWISE_SHIFT_LEFT", // <<
    BITWISE_SHIFT_RIGHT = "BITWISE_SHIFT_RIGHT", // >>
    //// Logical operators
    LOGICAL_AND = "LOGICAL_AND", // &&
    LOGICAL_OR = "LOGICAL_OR",  // ||
    LOGICAL_NOT = "LOGICAL_NOT", // !,
    LOGICAL_XOR = "LOGICAL_XOR", // ^^
    //// Comparison operators
    EQUAL = "EQUAL", // ==
    NOT_EQUAL = "NOT_EQUAL", // !=
    LESS_THAN = "LESS_THAN", // <
    LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL", // <=
    GREATER_THAN = "GREATER_THAN", // >
    GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL", // >=
    //// Assignment operators
    ASSIGN = "ASSIGN", // =
    ASSIGN_ADD = "ASSIGN_ADD", // +=
    ASSIGN_SUB = "ASSIGN_SUB", // -=
    ASSIGN_MUL = "ASSIGN_MUL", // *=
    ASSIGN_DIV = "ASSIGN_DIV", // /=
    ASSIGN_MOD = "ASSIGN_MOD", // %=
    ASSIGN_EXP = "ASSIGN_EXP", // **=
    // logical assignment operators have an extra '=' at the end
    ASSIGN_BITWISE_AND = "ASSIGN_BITWISE_AND", // =&=
    ASSIGN_BITWISE_OR = "ASSIGN_BITWISE_OR", // =|=
    ASSIGN_BITWISE_XOR = "ASSIGN_BITWISE_XOR", // =^=
    ASSIGN_BITWISE_NOT = "ASSIGN_BITWISE_NOT", // =~=
    ASSIGN_BITWISE_SHIFT_LEFT = "ASSIGN_BITWISE_SHIFT_LEFT", // =<<=
    ASSIGN_BITWISE_SHIFT_RIGHT = "ASSIGN_BITWISE_SHIFT_RIGHT", // =>>=
    ASSIGN_LOGICAL_AND = "ASSIGN_LOGICAL_AND", // =&&=
    ASSIGN_LOGICAL_OR = "ASSIGN_LOGICAL_OR", // =||=
    ASSIGN_LOGICAL_NOT = "ASSIGN_LOGICAL_NOT", // =!=

    // Punctuation
    COMMA = "COMMA", // ,
    SEMICOLON = "SEMICOLON", // ;
    COLON = "COLON", // :
    DOT = "DOT", // .
    QUESTION_MARK = "QUESTION_MARK", // ?
    LEFT_PAREN = "LEFT_PAREN", // (
    RIGHT_PAREN = "RIGHT_PAREN", // )
    LEFT_BRACE = "LEFT_BRACE", // {
    RIGHT_BRACE = "RIGHT_BRACE", // }
    LEFT_BRACKET = "LEFT_BRACKET", // [
    RIGHT_BRACKET = "RIGHT_BRACKET", // ]
    LEFT_ANGLE_BRACKET = "LEFT_ANGLE_BRACKET", // <
    RIGHT_ANGLE_BRACKET = "RIGHT_ANGLE_BRACKET", // >
    LEFT_ARROW = "LEFT_ARROW", // <-
    RIGHT_ARROW = "RIGHT_ARROW", // ->,
    STAR = "STAR", // *
    HASHTAG = "HASHTAG", // #
    QUOTE = "QUOTE", // ',
    DOUBLE_QUOTE = "DOUBLE_QUOTE", // "
    BACKTICK = "BACKTICK", // `
    DECORATOR = "DECORATOR", // @

    // Keywords
    IF = "IF",
    ELSE = "ELSE",
    FOR = "FOR",
    WHILE = "WHILE",
    FUNCTION = "FUNCTION",
    RETURN = "RETURN",
    CONTINUE = "CONTINUE",
    BREAK = "BREAK",
    VAR = "VAR",
    LET = "LET",
    CONST = "CONST",
    TRUE = "TRUE",
    FALSE = "FALSE",
    VOID = "VOID",
    NULL = "NULL", // used for null pointer
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
    DEFAULT = "DEFAULT", // used for both swithces and exports
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
    YEET = "YEET", // equivalent to throw
    TRY = "TRY",
    CATCH = "CATCH"
}

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

export class Tokenizer {
    private readonly source: string;
    private tokens: Tokens[]; // tokens in the order they were found
    private pos: number; // raw position in source
    private line: number; // line number
    private column: number; // column number
    private char: string; // current character

    constructor(source: string) {
        this.source = source;
        this.tokens = [];
        this.pos = 0;
        this.line = 1;
        this.column = 0;
        this.char = source[0];
    };

    peek(): string {
        return this.source[this.pos];
    };

    peekK(k: number): string {
        return this.source[this.pos + k];
    };

    next(): string {
        const char = this.char;
        this.char = this.source[++this.pos];
        if (char === "\n") {
            this.line++;
            this.column = 0;
            // doesn't support windows line endings
        } else {
            this.column++;
        }
        return char;
    };

    nextK(k: number): string {
        for (let i = 0; i < k; i++) {
            this.next();
        }
        return this.char;
    };

    skipWhitespace(): void {
        while (this.char === " " || this.char === "\t" || this.char === "\n" || this.char === "\r") {
            this.next();
        }
    }

    isAlphaNum(char: string): boolean {
        // if char:
        // - is a letter
        // - is a number
        // - is a _
        // - is a $
        // return true
        const ex = /[a-zA-Z0-9_$]/;
        return ex.test(char);
    };

    isNum(char: string): boolean {
        // if char:
        // - is a number
        // return true
        const ex = /[0-9]/;
        return ex.test(char);
    };

    isAlpha(char: string): boolean {
        // if char:
        // - is a letter
        // return true
        const ex = /[a-zA-Z]/;
        return ex.test(char);
    };
};
    


export class Parser {
    code: string;
    tokens: Tokens[];
    pos: number;
    constructor(code: string, options: ParserOptions) {
        // ...
    }

    parse(): AST {
        const ast = new AST();
        // ...
        return ast;
    };
};