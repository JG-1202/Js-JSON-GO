export = findOne;
/**
 * SettingsObject.
 * @typedef {Object} SettingsObject
 * @property {boolean=} unlinkInputObject - if set to true, the origin object will not be
 * altered by anyof the operations, default value is false.
 * @property {boolean=} mapIfNotFound - if set to true the query result will always be
 * mapped, even if the query did not return any matches, default value is false.
 * @property {Array=} ignoreOnTransform - array of responses from originObject that should
 * not be translated within Map constructors translate functions into destinationObject.
 * Default is [].
 * @property {number=} limit - maximum number of values that should be resolved.
 * Default is 0 (returning all values that match input path).
 * @property {function=} formatter this function is called before translating. Output of
 * the formatter function will be translated instead of the original value.
 * Default is: (value) => value.
 * @property {Object.<string, function>=} functions object with functions that can be called
 * from within query path. KeyName can be called with `$Function(`keyName`)` from query path.
 * Default is: `{}`.
 */
/**
 * ResolveObject.
 * @typedef {Object} ResolveObject
 * @property {any} value - value at specified path
 * @property {string} path - resolved path
 * @property {Object.<string, (number|string)>} references - resolved references
*/
/**
 * Resolves single value and path from objects specified query path
 * @param {(Object|Array)} obj - object/array from which value should be retrieved.
 * @param {string} path - string representation of path.
 * @param {SettingsObject=} settings - object with settings.
 * @returns {ResolveObject} returns value and resolved path found at specified path,
 * in case that multiple logical checks satisfy the first element will be returned
 */
declare function findOne(obj: (any | any[]), path: string, settings?: SettingsObject | undefined): ResolveObject;
declare namespace findOne {
    export { SettingsObject, ResolveObject };
}
/**
 * SettingsObject.
 */
type SettingsObject = {
    /**
     * - if set to true, the origin object will not be
     * altered by anyof the operations, default value is false.
     */
    unlinkInputObject?: boolean | undefined;
    /**
     * - if set to true the query result will always be
     * mapped, even if the query did not return any matches, default value is false.
     */
    mapIfNotFound?: boolean | undefined;
    /**
     * - array of responses from originObject that should
     * not be translated within Map constructors translate functions into destinationObject.
     * Default is [].
     */
    ignoreOnTransform?: any[] | undefined;
    /**
     * - maximum number of values that should be resolved.
     * Default is 0 (returning all values that match input path).
     */
    limit?: number | undefined;
    /**
     * this function is called before translating. Output of
     * the formatter function will be translated instead of the original value.
     * Default is: (value) => value.
     */
    formatter?: Function | undefined;
    /**
     * object with functions that can be called
     * from within query path. KeyName can be called with `$Function(`keyName`)` from query path.
     * Default is: `{}`.
     */
    functions?: {
        [x: string]: Function;
    } | undefined;
};
/**
 * ResolveObject.
 */
type ResolveObject = {
    /**
     * - value at specified path
     */
    value: any;
    /**
     * - resolved path
     */
    path: string;
    /**
     * - resolved references
     */
    references: {
        [x: string]: (number | string);
    };
};
