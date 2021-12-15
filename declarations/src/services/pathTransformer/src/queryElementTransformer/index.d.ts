export = QueryElementTransformer;
declare class QueryElementTransformer {
    constructor({ functions }: {
        functions: any;
    });
    functions: any;
    firstNCharactersOfPartEqual(n: any, toEqual: any): boolean;
    transformNumber(): {
        value: number;
    };
    transformString(): {
        value: any;
    };
    transformSpecials(): {
        value: boolean;
    };
    transformJSON(): {
        value: any;
    };
    transformRegExp(): {
        value: {
            regex: RegExp;
        };
    };
    transformFunctions(): {
        value: {
            function: any;
        };
    };
    transformCustomQuery(): {
        custom: string;
    };
    transformPaths(): {
        relativePath: any;
        relativeDepth: number;
    } | {
        absolutePath: any;
    };
    transformQueryElement(): {
        value: any;
    };
}
