export = Map;
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
 * @property {boolean=} parse - if set to true each queried element that is not yet of type object
 * will be attempted to parse.
 * By doing so there is no need to deep parse the input object before querying. This setting has no
 * effect while building JSON paths. Default is: false
 */
declare class Map {
    /**
     * Construct a map containing origin object, destination object and settings
     * @param {any?} originObject - origin object,
     * from where data should be obtained
     * @param {any?} destinationObject - destination object,
     * to where data should be mapped
     * @param {SettingsObject=} settings - object with settings
     */
    constructor(originObject: any | null, destinationObject: any | null, settings?: SettingsObject | undefined);
    originObject: Json;
    destinationObject: Json;
    /**
     * Transform values from origin object into destination object.
     * @param {string} originPath - path from where data should be obtained from origin object
     * @param {string} destinationPath - path to where data should be mapped into destination
     * object
     * @param {SettingsObject=} settings - object with settings
     */
    transform(originPath: string, destinationPath: string, settings?: SettingsObject | undefined): void;
    /**
     * Sets values on specified path on destination object
     * @param {string} path - string representation of path
     * @param {any} val - value to be set at specified path
     * @param {SettingsObject=} settings - object with settings
     * @returns {Object} object with newly set path in case that multiple logical checks
     * satisfy the first element will be set.
     */
    set(path: string, val: any, settings?: SettingsObject | undefined): any;
    /**
     * Builds function output on specified path on destination object
     * @param {string} path - string or array representation of path to set.
     * @param {function} functionToCall - function to call from which output should be set
     * on provided path.
     * @param {SettingsObject=} settings - object with settings.
     * @returns {(Object|Array)} object with newly set path in case that multiple logical checks.
     */
    build(path: string, functionToCall: Function, settings?: SettingsObject | undefined): (any | any[]);
    /**
     * Exports the destination object
     * @returns {(Object.<string, any>|Array)} destination object
     */
    export(): ({
        [x: string]: any;
    } | any[]);
}
declare namespace Map {
    export { SettingsObject };
}
import Json = require("../json");
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
    /**
     * - if set to true each queried element that is not yet of type object
     * will be attempted to parse.
     * By doing so there is no need to deep parse the input object before querying. This setting has no
     * effect while building JSON paths. Default is: false
     */
    parse?: boolean | undefined;
};
