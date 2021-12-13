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
 */
declare class Map {
    /**
     * Construct a map containing origin object, destination object and settings
     * @param {(Object|Array)} originObject - origin object,
     * from where data should be obtained
     * @param {(Object|Array)} destinationObject - destination object,
     * to where data should be mapped
     * @param {SettingsObject=} settings - object with settings
     */
    constructor(originObject: (any | any[]), destinationObject: (any | any[]), settings?: SettingsObject | undefined);
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
};
