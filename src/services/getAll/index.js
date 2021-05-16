const getAll = require('../../handlers/get/getAll.js');
const mergeFunctions = require('../../helpers/mergeFunctions');
const validateReponseAndPassDefault = require('../../helpers/validateReponseAndPassDefault');

/**
 * getAll service to be called from class
 * @param {Object} object Object to get from
 * @param {String} path Path to get from
 * @param {Object} functions Custom functions for this query
 * @param {Object} constructorsObject this constructors object
 * @returns getAll response
 */
const getAllService = (object, path, functions, constructorsObject) => {
  const funcs = mergeFunctions(functions, constructorsObject.functions);
  return validateReponseAndPassDefault(
    getAll(object, path, funcs, constructorsObject.settings),
    [],
    constructorsObject.settings.defaultGetAllResponse,
  );
};

module.exports = getAllService;
