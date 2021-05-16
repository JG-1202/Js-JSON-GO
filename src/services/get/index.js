const get = require('../../handlers/get/get.js');
const mergeFunctions = require('../../helpers/mergeFunctions');
const validateReponseAndPassDefault = require('../../helpers/validateReponseAndPassDefault');

/**
 * get service to be called from class
 * @param {Object} object Object to get from
 * @param {String} path Path to get from
 * @param {Object} functions Custom functions for this query
 * @param {Object} constructorsObject this constructors object
 * @returns getAll response
 */
const getService = (object, path, functions, constructorsObject) => {
  const funcs = mergeFunctions(functions, constructorsObject.functions);
  return validateReponseAndPassDefault(
    get(object, path, funcs, constructorsObject.settings),
    undefined,
    constructorsObject.settings.defaultGetResponse,
  );
};

module.exports = getService;
