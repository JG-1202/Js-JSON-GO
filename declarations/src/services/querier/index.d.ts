export = Querier;
declare class Querier extends PathTransformer {
    getPath(priorPath: any, element: any): any;
    getValueFromPath(element: any, object: any, currentElement: any, priorPath: any, refObject: any): any;
    getValue(element: any, object: any, currentElement: any, priorPath: any, refObject: any): any;
    isMaxResultsReached(intermediate: any): boolean;
    checkLogic({ firstPart, operator, secondPart, results, key, checkType, temp, intermediate, }: {
        firstPart: any;
        operator: any;
        secondPart: any;
        results: any;
        key: any;
        checkType: any;
        temp: any;
        intermediate: any;
    }): boolean;
    checkEachElementOfTemp({ query, object, tempObject, priorPath, checkType, refObject, intermediate, }: {
        query: any;
        object: any;
        tempObject: any;
        priorPath: any;
        checkType: any;
        refObject: any;
        intermediate: any;
    }): any[];
    query({ query, object, tempObject, priorPath, refObject, intermediate, }: {
        query: any;
        object: any;
        tempObject: any;
        priorPath: any;
        refObject: any;
        intermediate: any;
    }): any[];
}
import PathTransformer = require("../pathTransformer");
