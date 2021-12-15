export = ElementTransformer;
declare class ElementTransformer {
    constructor({ functions, element }: {
        functions: any;
        element: any;
    });
    functions: any;
    getElementAndReference(element: any): void;
    element: any;
    reference: any;
    getFirstLastChar(): void;
    firstChar: any;
    lastChar: any;
    transformWildcard(): {
        wildcard: boolean;
    };
    transformString(): {
        string: any;
    };
    transformNumber(): {
        number: number;
    };
    transformQuery(): {
        query: any[];
    };
    transformElement(): {
        reference: any;
        string: any;
    } | {
        string: any;
    };
}
