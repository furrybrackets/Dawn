import { ParserOptions, AST } from "./types.js";

export enum Tokens {
    ILLEGAL = "ILLEGAL",
    EOF = "EOF",
    // Identifiers and literals
    IDENT = "IDENT", // ex: _name, name_thing, _, $verb, va3rw1thn7mb3rs.
    NUMBER = "NUMBER", // ex: 12345.12345, .12345, 1.
    STRING = "STRING", // ex: "foo", "bar", "baz", etc.

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
    ASSIGN_BITWISE_AND = "ASSIGN_BITWISE_AND", // &=
    ASSIGN_BITWISE_OR = "ASSIGN_BITWISE_OR", // |=
    ASSIGN_BITWISE_XOR = "ASSIGN_BITWISE_XOR", // ^=
    ASSIGN_BITWISE_NOT = "ASSIGN_BITWISE_NOT", // ~=
    ASSIGN_BITWISE_SHIFT_LEFT = "ASSIGN_BITWISE_SHIFT_LEFT", // <<=
    ASSIGN_BITWISE_SHIFT_RIGHT = "ASSIGN_BITWISE_SHIFT_RIGHT", // >>=
    ASSIGN_LOGICAL_AND = "ASSIGN_LOGICAL_AND", // &&=
    ASSIGN_LOGICAL_OR = "ASSIGN_LOGICAL_OR", // ||=
    ASSIGN_LOGICAL_NOT = "ASSIGN_LOGICAL_NOT", // !=
    ASSIGN_LOGICAL_XOR = "ASSIGN_LOGICAL_XOR", // ^^=

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
    HASHTAG = "HASHTAG", // #
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
    CATCH = "CATCH",

    // Types
    INTTYPE = "INT", // int or i[any number less than 2^23]
    UNSIGNEDINT = "UNSIGNED_INT", // uint or u[any number less than 2^23]
    FLOATTYPE = "FLOAT", // float or f
    UNSIGNEDFLOAT = "UNSIGNED_FLOAT", // ufloat,
    FLOAT128TYPE = "FLOAT128", // float128 or f128
    STRINGTYPE = "STRING",
    BOOLTYPE = "BOOL",
    FRACTIONTYPE = "FRACTION",
    VECTORTYPE = "VECTOR",
    MATRIXTYPE = "MATRIX",
    CHARTYPE = "CHAR",
    UNICODECHARTYPE = "UNICODE_CHAR",
    POLYNOMIALTYPE = "POLYNOMIAL",
    ARBFLOATTYPE = "ARBFLOAT", // arbitrary floating point type
    ARBINTTYPE = "ARBINT", // arbitrary integer type
    CSTRINGTYPE = "CSTRING", // C-style string
    COMMENT = "COMMENT", // comment
};

export interface Position {
    line: number;
    column: number;
    pos: number;
};

export interface Token {
    type: Tokens;
    value: string;
    start?: Position,
    end?: Position,
};

export function CreateToken(type: Tokens, value: string, start: Position, end: Position): Token {
    return {
        type: type,
        value: value,
        start: start,
        end: end
    };
};

export function StringToKeyword(str: string, start: Position, end?: Position): Token {
    switch (str) {
        case "if":
            return CreateToken(Tokens.IF, str, start, end ? end : start);
        case "else":
            return CreateToken(Tokens.ELSE, str, start, end ? end : start);
        case "for":
            return CreateToken(Tokens.FOR, str, start, end ? end : start);
        case "while":
            return CreateToken(Tokens.WHILE, str, start, end ? end : start);
        case "function":
            return CreateToken(Tokens.FUNCTION, str, start, end ? end : start);
        case "return":
            return CreateToken(Tokens.RETURN, str, start, end ? end : start);
        case "continue":
            return CreateToken(Tokens.CONTINUE, str, start, end ? end : start);
        case "break":
            return CreateToken(Tokens.BREAK, str, start, end ? end : start);
        case "let":
            return CreateToken(Tokens.LET, str, start, end ? end : start);
        case "const":
            return CreateToken(Tokens.CONST, str, start, end ? end : start);
        case "true":
            return CreateToken(Tokens.TRUE, str, start, end ? end : start);
        case "false":
            return CreateToken(Tokens.FALSE, str, start, end ? end : start);
        case "void":
            return CreateToken(Tokens.VOID, str, start, end ? end : start);
        case "null":
            return CreateToken(Tokens.NULL, str, start, end ? end : start);
        case "new":
            return CreateToken(Tokens.NEW, str, start, end ? end : start);
        case "this":
            return CreateToken(Tokens.THIS, str, start, end ? end : start);
        case "super":
            return CreateToken(Tokens.SUPER, str, start, end ? end : start);
        case "class":
            return CreateToken(Tokens.CLASS, str, start, end ? end : start);
        case "extends":
            return CreateToken(Tokens.EXTENDS, str, start, end ? end : start);
        case "implements":
            return CreateToken(Tokens.IMPLEMENTS, str, start, end ? end : start);
        case "static":
            return CreateToken(Tokens.STATIC, str, start, end ? end : start);
        case "public":
            return CreateToken(Tokens.PUBLIC, str, start, end ? end : start);
        case "private":
            return CreateToken(Tokens.PRIVATE, str, start, end ? end : start);
        case "interface":
            return CreateToken(Tokens.INTERFACE, str, start, end ? end : start);
        case "switch":
            return CreateToken(Tokens.SWITCH, str, start, end ? end : start);
        case "case":
            return CreateToken(Tokens.CASE, str, start, end ? end : start);
        case "default":
            return CreateToken(Tokens.DEFAULT, str, start, end ? end : start);
        case "import":
            return CreateToken(Tokens.IMPORT, str, start, end ? end : start);
        case "from":
            return CreateToken(Tokens.FROM, str, start, end ? end : start);
        case "as":
            return CreateToken(Tokens.AS, str, start, end ? end : start);
        case "type":
            return CreateToken(Tokens.TYPE, str, start, end ? end : start);
        case "enum":
            return CreateToken(Tokens.ENUM, str, start, end ? end : start);
        case "extern":
            return CreateToken(Tokens.EXTERN, str, start, end ? end : start);
        case "export":
            return CreateToken(Tokens.EXPORT, str, start, end ? end : start);
        case "delete":
            return CreateToken(Tokens.DELETE, str, start, end ? end : start);
        case "typeof":
            return CreateToken(Tokens.TYPEOF, str, start, end ? end : start);
        case "in":
            return CreateToken(Tokens.IN, str, start, end ? end : start);
        case "instanceof":
            return CreateToken(Tokens.INSTANCEOF, str, start, end ? end : start);
        case "throw":
            return CreateToken(Tokens.THROW, str, start, end ? end : start);
        case "yeet":
            return CreateToken(Tokens.YEET, str, start, end ? end : start);
        case "try":
            return CreateToken(Tokens.TRY, str, start, end ? end : start);
        case "catch":
            return CreateToken(Tokens.CATCH, str, start, end ? end : start);
        case "matrix":
            return CreateToken(Tokens.MATRIXTYPE, str, start, end ? end : start);
        case "vector":
            return CreateToken(Tokens.VECTORTYPE, str, start, end ? end : start);
        case "fraction":
            return CreateToken(Tokens.FRACTIONTYPE, str, start, end ? end : start);
        case "bool":
            return CreateToken(Tokens.BOOLTYPE, str, start, end ? end : start);
        case "uni":
            return CreateToken(Tokens.UNICODECHARTYPE, str, start, end ? end : start);
        case "char":
            return CreateToken(Tokens.CHARTYPE, str, start, end ? end : start);
        case "string":
            return CreateToken(Tokens.STRINGTYPE, str, start, end ? end : start);
        case "polynomial":
            return CreateToken(Tokens.POLYNOMIALTYPE, str, start, end ? end : start);
        case "cstring":
            return CreateToken(Tokens.CSTRINGTYPE, str, start, end ? end : start);
        case "integer":
            return CreateToken(Tokens.ARBINTTYPE, str, start, end ? end : start);
        case "anyfloat":
            return CreateToken(Tokens.ARBFLOATTYPE, str, start, end ? end : start);
        case "float":
            return CreateToken(Tokens.FLOATTYPE, str, start, end ? end : start);
        case "f128":
            return CreateToken(Tokens.FLOAT128TYPE, str, start, end ? end : start);
        case "f32":
            return CreateToken(Tokens.FLOATTYPE, str, start, end ? end : start);
        default:
            if (str[0] == 'i') {
                // integer type, i[0-9]+
                const isDigit = (c: string) => c >= '0' && c <= '9';
                if (isDigit(str[1])) {
                    return CreateToken(Tokens.INTTYPE, str, start, end ? end : start);
                }
            }
            return CreateToken(Tokens.IDENT, str, start, end ? end : start);
    }
}

type char = string | -1;

function toStr(c: char): string {
    return c === -1 ? "" : c;
}

export class Tokenizer {
    private readonly source: string;
    private tokens: Token[]; // tokens in the order they were found
    private readPos: number; // raw position in source
    private line: number; // line number
    private column: number; // column number
    private char: char; // current character
    private pos: number;

    constructor(source: string) {
        this.source = source;
        this.tokens = [];
        this.pos = 0;
        this.line = 1;
        this.column = 0;
        this.char = source[0];
        this.readPos = 1;
    };

    read() {
        if (this.readPos >= this.source.length) {
            this.char = -1;
        } else {
            this.char = this.source[this.readPos];;
        }
        this.pos = this.readPos;
        this.readPos++;
    }

    synthPos(): Position {
        return {
            line: this.line,
            column: this.column,
            pos: this.pos
        };
    }

    makeToken(type: Tokens, value: string, start: Position, end?: Position): Token {
        return CreateToken(type, value, start, end ? end : this.synthPos());
    }

    skipWhitespace() {
        while (this.char === " " || this.char === "\t" || this.char === "\n" || this.char === "\r") {
            if (this.char === "\n") {
                this.line++;
                this.column = 0;
            } else {
                this.column++;
            }
            this.read();
        };
    };

    nextToken(): Token {
        let token: Token;
        let start: Position;
        let end: Position;

        switch (this.char) {
            case '=':
                if (this.source[this.readPos] === '=') {
                    this.read();
                    token = this.makeToken(Tokens.EQUAL, "==", this.synthPos());
                    break;
                };
                token = this.makeToken(Tokens.ASSIGN, "=", this.synthPos());
                break;
            case ';':
                token = this.makeToken(Tokens.SEMICOLON, ";", this.synthPos());
                break;
            case ',':
                token = this.makeToken(Tokens.COMMA, ",", this.synthPos());
                break;
            case ':':
                token = this.makeToken(Tokens.COLON, ":", this.synthPos());
                break;
            case '(':
                token = this.makeToken(Tokens.LEFT_PAREN, "(", this.synthPos());
                break;
            case ')':
                token = this.makeToken(Tokens.RIGHT_PAREN, ")", this.synthPos());
                break;
            case '{':
                token = this.makeToken(Tokens.LEFT_BRACE, "{", this.synthPos());
                break;
            case '}':
                token = this.makeToken(Tokens.RIGHT_BRACE, "}", this.synthPos());
                break;
            case '[':
                token = this.makeToken(Tokens.LEFT_BRACKET, "[", this.synthPos());
                break;
            case ']':
                token = this.makeToken(Tokens.RIGHT_BRACKET, "]", this.synthPos());
                break;
            case '.':
                token = this.makeToken(Tokens.DOT, ".", this.synthPos());
                break;
            case '@':
                token = this.makeToken(Tokens.DECORATOR, "@", this.synthPos());
                break;
            case '#':
                token = this.makeToken(Tokens.HASHTAG, "#", this.synthPos());
                break;
            case '?':
                token = this.makeToken(Tokens.QUESTION_MARK, "?", this.synthPos());
                break;
            case '`':
                token = this.makeToken(Tokens.BACKTICK, "`", this.synthPos());
                break;
            // math operators
            case '+':
                if (this.source[this.readPos] === '=') {
                    this.read()
                    token = this.makeToken(Tokens.ASSIGN_ADD, "+=", this.synthPos());
                    break;
                }
                if (this.source[this.readPos] === '+') {
                    this.read()
                    token = this.makeToken(Tokens.INC, "++", this.synthPos());
                    break;
                }
                token = this.makeToken(Tokens.PLUS, "+", this.synthPos());
                break;
            case '-':
                if (this.source[this.readPos] === '=') {
                    this.read()
                    token = this.makeToken(Tokens.ASSIGN_SUB, "-=", this.synthPos());
                    break;
                }
                if (this.source[this.readPos] === '-') {
                    this.read()
                    token = this.makeToken(Tokens.DEC, "--", this.synthPos());
                    break;
                }
                if (this.source[this.readPos] === '>') {
                    this.read()
                    token = this.makeToken(Tokens.RIGHT_ARROW, "->", this.synthPos());
                    break;
                }
                token = this.makeToken(Tokens.MINUS, "-", this.synthPos());
                break;
            case '*':
                if (this.source[this.readPos] === '=') {
                    this.read()
                    token = this.makeToken(Tokens.ASSIGN_MUL, "*=", this.synthPos());
                    break;
                }
                if (this.source[this.readPos] === '*') {
                    this.read()
                    if (this.source[this.readPos] === '=') {
                        this.read()
                        token = this.makeToken(Tokens.ASSIGN_EXP, "**=", this.synthPos());
                        break;
                    }
                    token = this.makeToken(Tokens.EXP, "**", this.synthPos());
                    break;
                }
                token = this.makeToken(Tokens.MUL, "*", this.synthPos());
                break;
            case '/':
                if (this.source[this.readPos] === '=') {
                    this.read()
                    token = this.makeToken(Tokens.ASSIGN_DIV, "/=", this.synthPos());
                    break;
                }
                token = this.makeToken(Tokens.DIV, "/", this.synthPos());
                break;
            case '%':
                if (this.source[this.readPos] === '=') {
                    this.read()
                    token = this.makeToken(Tokens.ASSIGN_MOD, "%=", this.synthPos());
                    break;
                }
                token = this.makeToken(Tokens.MOD, "%", this.synthPos());
                break;
            // bitwise operators
            case '^':
                if (this.source[this.readPos] === '=') {
                    this.read()
                    token = this.makeToken(Tokens.ASSIGN_BITWISE_XOR, "^=", this.synthPos());
                    break;
                }
                if (this.source[this.readPos] === '^') {
                    this.read()
                    if (this.source[this.readPos] === '=') {
                        this.read()
                        token = this.makeToken(Tokens.ASSIGN_LOGICAL_XOR, "^^=", this.synthPos());
                        break;
                    }
                    token = this.makeToken(Tokens.LOGICAL_XOR, "^^", this.synthPos());
                    break;
                }
                token = this.makeToken(Tokens.BITWISE_XOR, "^", this.synthPos());
                break;
            case '&':
                if (this.source[this.readPos] === '=') {
                    this.read()
                    token = this.makeToken(Tokens.ASSIGN_BITWISE_AND, "&=", this.synthPos());
                    break;
                }
                if (this.source[this.readPos] === '&') {
                    this.read()
                    if (this.source[this.readPos] === '=') {
                        this.read()
                        token = this.makeToken(Tokens.ASSIGN_LOGICAL_AND, "&&=", this.synthPos());
                        break;
                    }
                    token = this.makeToken(Tokens.LOGICAL_AND, "&&", this.synthPos());
                    break;
                }
                token = this.makeToken(Tokens.BITWISE_AND, "&", this.synthPos());
                break;
            case '|':
                if (this.source[this.readPos] === '=') {
                    this.read()
                    token = this.makeToken(Tokens.ASSIGN_BITWISE_OR, "|=", this.synthPos());
                    break;
                }
                if (this.source[this.readPos] === '|') {
                    this.read()
                    if (this.source[this.readPos] === '=') {
                        this.read()
                        token = this.makeToken(Tokens.ASSIGN_LOGICAL_OR, "||=", this.synthPos());
                        break;
                    }
                    token = this.makeToken(Tokens.LOGICAL_OR, "||", this.synthPos());
                    break;
                }
                token = this.makeToken(Tokens.BITWISE_OR, "|", this.synthPos());
                break;
            case '~':
                token = this.makeToken(Tokens.BITWISE_NOT, "~", this.synthPos());
                break;
            case '!':
                if (this.source[this.readPos] === '=') {
                    this.read()
                    token = this.makeToken(Tokens.NOT_EQUAL, "!=", this.synthPos());
                    break;
                }
                token = this.makeToken(Tokens.LOGICAL_NOT, "!", this.synthPos());
                break;
            // comparison operators (and bitwise shift)
            case '<':
                if (this.source[this.readPos] === '=') {
                    this.read()
                    token = this.makeToken(Tokens.LESS_THAN_OR_EQUAL, "<=", this.synthPos());
                    break;
                }
                if (this.source[this.readPos] === '<') {
                    this.read()
                    if (this.source[this.readPos] === '=') {
                        this.read()
                        token = this.makeToken(Tokens.ASSIGN_BITWISE_SHIFT_LEFT, "<<=", this.synthPos());
                        break;
                    }
                    token = this.makeToken(Tokens.BITWISE_SHIFT_LEFT, "<<", this.synthPos());
                    break;
                }
                if (this.source[this.readPos] === '-') {
                    this.read()
                    token = this.makeToken(Tokens.LEFT_ARROW, "<-", this.synthPos());
                    break;
                }
                token = this.makeToken(Tokens.LESS_THAN, "<", this.synthPos());
                break;
            case '>':
                if (this.source[this.readPos] === '=') {
                    this.read()
                    token = this.makeToken(Tokens.GREATER_THAN_OR_EQUAL, ">=", this.synthPos());
                    break;
                }
                if (this.source[this.readPos] === '>') {
                    this.read()
                    if (this.source[this.readPos] === '=') {
                        this.read()
                        token = this.makeToken(Tokens.ASSIGN_BITWISE_SHIFT_RIGHT, ">>=", this.synthPos());
                        break;
                    }
                    token = this.makeToken(Tokens.BITWISE_SHIFT_RIGHT, ">>", this.synthPos());
                    break;
                }
                token = this.makeToken(Tokens.GREATER_THAN, ">", this.synthPos());
                break;
            case -1:
                token = this.makeToken(Tokens.EOF, "", this.synthPos());
                break;
            default:
                // note: variable names cannot start with a number. They can however, start with a unicode character.
                if (this.isAlphaOrGreek(this.char)) {
                    token = this.readIdentifier();
                    return token;
                }
                // fp cannot start with a decimal point. It will be read as a dot.
                if (this.isNumber(this.char)) {
                    token = this.readNumber();
                    return token;
                };
                token = this.makeToken(Tokens.ILLEGAL, this.char, this.synthPos());
        }
        this.read();
        return token;
    };

    isAlphaNum(char: string): boolean {
        // if character is a letter, digit, underscore, or a dollar sign or all greek letters
        const regx = /^[a-zA-Z0-9_\$\u0391-\u03A5\u03A8-\u03C9]$/;
        return regx.test(char);
    }

    isAlphaOrGreek(char: string): boolean {
        // if character is a letter, underscore, or a dollar sign or all greek letters
        const regx = /^[a-zA-Z_\$\u0391-\u03A5\u03A8-\u03C9]$/;
        return regx.test(char);
    };

    readIdentifier(): Token {
        let str = "";
        while (this.isAlphaNum(toStr(this.char))) {
            str += toStr(this.char);
            this.read();
        };
        return StringToKeyword(str, this.synthPos());
    };

    readNumber(): Token {
        let str = "";
        while (this.isNumber(toStr(this.char))) {
            str += toStr(this.char);
            this.read();
        };
        return this.makeToken(Tokens.NUMBER, str, this.synthPos());
    };


    isNumber(char: string): boolean {
        // if character is a digit or a dot
        const regx = /^[0-9.]$/;
        return regx.test(char);
    };

    tokenize(): Token[] {
        while (this.char !== -1) {
            this.skipWhitespace();
            this.tokens.push(this.nextToken());
        }
        return this.tokens;
    }

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