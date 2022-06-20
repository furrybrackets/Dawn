import { GeneratorOptions, AST } from "./types";

export default class Generator {
    options: GeneratorOptions;
    constructor(options: GeneratorOptions) {
        this.options = options;
    }

    // MakeFunc() -> ASTFunction, etc.

    gen(): AST {
        let ast = new AST();
        // ...
        return ast;
    };

    getText(): string {
        let text = "";
        // ...
        return text;
    };
}