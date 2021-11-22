const _ = require('lodash');

/**
 * Unlinks object, removes reference to other object
 * @param {any} obj - object/array or any other input
 * @returns {object} unlinked object/array or initial input
 */
const unlink = (obj) => {
  console.warn('unlink will be deprecated from version 1.0.0 onwards.');
  if (obj && typeof obj === 'object') {
    return _.cloneDeep(obj);
  }
  return obj;
};

module.exports = unlink;
