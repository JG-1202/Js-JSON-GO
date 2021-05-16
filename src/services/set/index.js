const set = require('../../handlers/set/set.js');
const mergeFunctions = require('../../helpers/mergeFunctions');

/**
 * set service to be called from class
 * @param {Object} object Object to set to
 * @param {String} path Path to set to
 * @param {Any} value Value to set
 * @param {Object} functions Custom functions for this query
 * @param {Object} constructorsObject this constructors object
 * @returns getAll response
 */
const setSerivce = (object, path, value, functions, constructorsObject) => {
  const funcs = mergeFunctions(functions, constructorsObject.functions);
  return set(object, path, value, funcs, constructorsObject.settings);
};

module.exports = setSerivce;
