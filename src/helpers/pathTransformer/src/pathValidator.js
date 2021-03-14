const stringify = require('../../../handlers/basic/stringify');

/**
 * Check if input is existent and an array
 */
const isArray = (path) => path && Array.isArray(path);

/**
 * Check if input is string, number or query, otherwise throw error
 */
// eslint-disable-next-line complexity
const validateElement = (element) => {
  if (element
    && (
      element.string !== undefined
      || element.number !== undefined
      || element.query
      || element.wildcard
    )
  ) {
    return;
  }
  throw new Error(`Path element ${stringify(element)} is invalid.`);
};

/**
 * Validate path, if invalid throw error
 * @param {any} path - representation of path
 */
const pathValidator = (path) => {
  if (isArray(path)) {
    path.forEach((element) => {
      validateElement(element);
    });
    return path;
  }
  throw new Error('Input path is invalid.');
};

module.exports = pathValidator;
