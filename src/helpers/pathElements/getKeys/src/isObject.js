/**
 * Check whether object exists and is of type object
 * @param {Any} object
 * @returns {Boolean}
 */
const isObject = (object) => object && typeof object === 'object' && !Array.isArray(object);

module.exports = isObject;
