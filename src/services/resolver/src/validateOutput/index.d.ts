export = validateOutput;
declare function validateOutput(tempObject: any, isLastIteration: any): {
    shouldItContinue: boolean;
    newTempObject: any;
};
