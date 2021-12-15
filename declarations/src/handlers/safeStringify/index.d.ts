export = safeStringify;
/**
 * Tries to stringify value if it is an object
 * @param {any} value value to stringify
 * @param {any} defaultValue value to return when failed to stringify
 * @returns Stringified value, or default value
 */
declare function safeStringify(value: any, defaultValue: any): any;
