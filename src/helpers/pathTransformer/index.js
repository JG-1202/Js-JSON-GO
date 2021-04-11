const pathToArrayTransformer = require('./src/pathToArrayTransformer.js');
const pathValidator = require('./src/pathValidator.js');

/**
 * Transforms string representation of path into workable array representation
 * @param {any} path - either already transformed path, or string representation of path
 * @param {Object} funcs - object with functions provided by the user that may be part of the query
 * @returns {Array} - array representation of path
 */
const pathTransformer = (path, funcs) => (typeof path === 'string' ? pathToArrayTransformer(path, funcs) : pathValidator(path));

module.exports = pathTransformer;
