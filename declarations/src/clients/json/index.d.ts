export = Json;
/**
 * ResolveObject.
 * @typedef {Object} ResolveObject
 * @property {any} value - value at specified path
 * @property {string} path - resolved path
 * @property {Object.<string, (number|string)>} references - resolved references
*/
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
declare class Json {
    /**
     * Construct Json
     * @param {(Object|Array)} object - input object/array
     * @param {SettingsObject=} settings - object with settings
     */
    constructor(object: (any | any[]), settings?: SettingsObject | undefined);
    settings: {};
    object: any;
    /**
     * Retrieves single value from objects specified query path
     * @param {string} path - string representation of path
     * @param {SettingsObject=} settings - object with settings
     * @returns {any} returns value found at specified path, in case that multiple logical checks
     * satisfy the first element will be returned
     */
    getOne(path: string, settings?: SettingsObject | undefined): any;
    /**
     * Finds single value and path from objects specified query path
     * @param {string} path - string representation of path
     * @param {SettingsObject=} settings - object with settings
     * @returns {ResolveObject} returns value and resolved path found at specified path,
     * in case that multiple logical checks satisfy the first element will be returned
     */
    findOne(path: string, settings?: SettingsObject | undefined): ResolveObject;
    /**
     * Retrieves resolved path from objects specified path
     * @param {string} path - string representation of path
     * @param {SettingsObject=} settings - object with settings
     * @returns {string} returns resolved path found at specified path,
     * in case that multiple logical checks satisfy the first element will be returned
     */
    getPath(path: string, settings?: SettingsObject | undefined): string;
    /**
     * Retrieves values from objects specified query path
     * @param {string} path - string representation of path
     * @param {SettingsObject=} settings - object with settings
     * @returns {Array} returns array of values that match the specified path with logical checks
     */
    get(path: string, settings?: SettingsObject | undefined): any[];
    /**
     * Retrieves all values from objects specified query path
     * @param {string} path - string representation of path
     * @param {SettingsObject=} settings - object with settings
     * @returns {Array} returns array of values that match the specified path with logical checks
     */
    getAll(path: string, settings?: SettingsObject | undefined): any[];
    /**
     * Finds values and paths from objects specified query path
     * @param {string} path - string representation of path
     * @param {SettingsObject=} settings - object with settings
     * @returns {ResolveObject[]} returns array of objects with value/path property
     * that match the specified path with logical checks
     */
    find(path: string, settings?: SettingsObject | undefined): ResolveObject[];
    /**
     * Finds all values and paths from objects specified query path
     * @param {string} path - string representation of path
     * @param {SettingsObject=} settings - object with settings
     * @returns {ResolveObject[]} returns array of objects with value/path property
     * that match the specified path with logical checks
     */
    findAll(path: string, settings?: SettingsObject | undefined): ResolveObject[];
    /**
     * Retrieves resolved paths from objects specified path
     * @param {string} path - string representation of path
     * @param {SettingsObject=} settings - object with settings
     * @returns {string[]} returns array of paths that match the specified path with logical checks
     */
    getPaths(path: string, settings?: SettingsObject | undefined): string[];
    /**
     * Retrieves all resolved paths from objects specified path
     * @param {string} path - string representation of path
     * @param {SettingsObject=} settings - object with settings
     * @returns {string[]} returns array of paths that match the specified path with logical checks
     */
    getAllPaths(path: string, settings?: SettingsObject | undefined): string[];
    /**
     * Sets single value on specified path
     * @param {string} path - string representation of path
     * @param {any} val - value to be set at specified path
     * @param {SettingsObject=} settings - object with settings
     * @returns {Object} object with newly set path in case that multiple logical checks
     * satisfy the first element will be set.
     */
    setOne(path: string, val: any, settings?: SettingsObject | undefined): any;
    /**
     * Sets values on specified path
     * @param {string} path - string representation of path
     * @param {any} val - value to be set at specified path
     * @param {SettingsObject=} settings - object with settings
     * @returns {Object} object with newly set path in case that multiple logical checks
     * satisfy the first element will be set.
     */
    set(path: string, val: any, settings?: SettingsObject | undefined): any;
    /**
     * Sets all values on specified path
     * @param {string} path - string representation of path
     * @param {any} val - value to be set at specified path
     * @param {SettingsObject=} settings - object with settings
     * @returns {Object} object with newly set path in case that multiple logical checks
     * satisfy the first element will be set.
     */
    setAll(path: string, val: any, settings?: SettingsObject | undefined): any;
    /**
     * Chops an array or object into smaller pieces
     * @param {object} value - object or array
     * @param {number} chopSize - size of pieces.
     * @returns {Array} array of chopped pieces.
     */
    chop(chopSize: number): any[];
    /**
     * Exports the object
     * @returns {Object} object
     */
    export(): any;
}
declare namespace Json {
    export { ResolveObject, SettingsObject };
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
    /**
     * - if set to true each queried element that is not yet of type object
     * will be attempted to parse.
     * By doing so there is no need to deep parse the input object before querying. This setting has no
     * effect while building JSON paths. Default is: false
     */
    parse?: boolean | undefined;
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
