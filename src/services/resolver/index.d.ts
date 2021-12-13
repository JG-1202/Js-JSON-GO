export = Resolver;
declare class Resolver extends Querier {
    addMultipleResults({ arrayPath, index, elementValues, remainingPath, obj, results, refObject, element, intermediate, }: {
        arrayPath: any;
        index: any;
        elementValues: any;
        remainingPath: any;
        obj: any;
        results: any;
        refObject: any;
        element: any;
        intermediate: any;
    }): void;
    getMultiplePathElements({ element, obj, tempObject, type, priorPath, refObject, intermediate, }: {
        element: any;
        obj: any;
        tempObject: any;
        type: any;
        priorPath: any;
        refObject: any;
        intermediate: any;
    }): any[];
    getPathElements({ element, obj, tempObject, type, priorPath, refObject, intermediate, }: {
        element: any;
        obj: any;
        tempObject: any;
        type: any;
        priorPath: any;
        refObject: any;
        intermediate: any;
    }): any[];
    validateOutput(tempObject: any, isLastIteration: any): {
        shouldItContinue: boolean;
        newTempObject: any;
    };
    simpleResolve({ arrayPath, obj, refObject }: {
        arrayPath: any;
        obj: any;
        refObject: any;
    }): any;
    resolveIteration({ element, obj, tempObject, priorPath, results, index, arrayPath, refObject, intermediate, }: {
        element: any;
        obj: any;
        tempObject: any;
        priorPath: any;
        results: any;
        index: any;
        arrayPath: any;
        refObject: any;
        intermediate: any;
    }): {
        shouldItContinue: boolean;
        newTempObject: any;
    };
    initiateResolver({ references, path, intermediate }: {
        references: any;
        path: any;
        intermediate: any;
    }): {
        refObject: any;
        arrayPath: any;
        priorPath: any[];
        results: any[];
    };
    resultCounter: number;
    addResult({ results, path, value, references, intermediate, }: {
        results: any;
        path: any;
        value: any;
        references: any;
        intermediate: any;
    }): boolean;
    resolve(obj: any, path: any, references: any, intermediate: any): any;
    find(obj: any, path: any): any;
    getPaths(obj: any, path: any): any;
    get(obj: any, path: any): any;
}
import Querier = require("../querier");
