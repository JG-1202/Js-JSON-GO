const setAll = require('../../handlers/set/setAll.js');
const mergeFunctions = require('../../helpers/mergeFunctions');

/**
 * setAll service to be called from class
 * @param {Object} object Object to set to
 * @param {String} path Path to set to
 * @param {Any} value Value to set
 * @param {Object} functions Custom functions for this query
 * @param {Object} constructorsObject this constructors object
 * @returns getAll response
 */
const setAllSerivce = (object, path, value, functions, constructorsObject) => {
  const funcs = mergeFunctions(functions, constructorsObject.functions);
  return setAll(object, path, value, funcs, constructorsObject.settings);
};

module.exports = setAllSerivce;
