export = BasicProcessor;
declare class BasicProcessor {
    isObjectLike: (variable: any) => boolean;
    isObject: (variable: any) => boolean;
    isArray: (variable: any) => boolean;
    isJson(variable: any): boolean;
    makeObject(variable: any): any;
    makeArray(variable: any): any;
    makeJson(variable: any): any;
    stringify(variable: any): any;
    safeStringify(variable: any, defaultValue: any): any;
    parse(variable: any): any;
    safeParse(variable: any, defaultValue: any): any;
    chop(variable: any, chopSize: any): any[];
    mergeObjects(variableArray: any): {};
    mergeArrays(variableArray: any): any[];
    unlink(variable: any): any;
    makePathString(inputPath: any): any;
}
