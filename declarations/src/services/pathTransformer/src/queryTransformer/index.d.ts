export = queryTransformer;
declare class queryTransformer extends QueryElementTransformer {
    constructor({ functions, queryString }: {
        functions: any;
        queryString: any;
    });
    queryString: any;
    result: any[];
    isString: any;
    part: string;
    arrayCounter: number;
    charIsBracket(char: any): boolean;
    charMayBeIgnored(char: any): boolean;
    arrayCounterHigherThanOne(char: any): boolean;
    defaultCharHandler(char: any): void;
    charIsQuote(char: any): boolean;
    partIsString(char: any): boolean;
    charIsOperator(char: any): boolean;
    validateResult(): void;
    transformQuery(): any[];
    continue: boolean;
}
import QueryElementTransformer = require("../queryElementTransformer");
