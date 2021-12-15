export = safeParse;
/**
 * Tries to parse value if it is not yet an object
 * @param {any} value value to parse
 * @param {any} defaultValue value to return when parsing fails
 * @returns Parsed value, or default value
 */
declare function safeParse(value: any, defaultValue: any): any;
