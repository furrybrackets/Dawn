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
}