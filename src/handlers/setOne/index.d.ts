export = setOne;
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
 * Sets single value on specified path
 * @param {(Object|Array)} obj - object
 * @param {string} path - string or array representation of path to set.
 * @param {any} value - value to be set at specified path.
 * @param {SettingsObject=} settings - object with settings.
 * @returns {(Object|Array)} object with newly set path in case that multiple logical checks
 * satisfy the first element will be set.
 */
declare function setOne(object: any, path: string, value: any, settings?: SettingsObject | undefined): (any | any[]);
declare namespace setOne {
    export { SettingsObject };
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
