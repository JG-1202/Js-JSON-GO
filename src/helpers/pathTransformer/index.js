const pathToArrayTransformer = require('./src/pathToArrayTransformer.js');
const pathValidator = require('./src/pathValidator.js');

/**
 * Transforms string representation of path into workable array representation
 * @param {any} path - either already transformed path, or string representation of path
 * @returns {Array} - array representation of path
 */
const pathTransformer = (path) => (typeof path === 'string' ? pathToArrayTransformer(path) : pathValidator(path));

module.exports = pathTransformer;
