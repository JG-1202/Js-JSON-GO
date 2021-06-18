const validateReponseAndPassDefault = require('../../helpers/validators/validateReponseAndPassDefault');
const mayGetAllResponseBeMapped = require('../../helpers/validators/mayGetAllResponseBeMapped');
const filterInvalidGetAllResponses = require('../../helpers/validators/filterInvalidGetAllResponses');

/**
 * translateAll service to be called from class
 * @param {String} originPath path from where data should be obtained from origin object
 * @param {originPath} destinationPath path to where data should be mapped into destination
 * object
 * @param {Object} constructorsObject this constructors object
 * @returns translate response
 */
const translateAllSerivce = (originPath, destinationPath, functions, constructorsObject) => {
  const getAllResponse = constructorsObject.originObject.getAll(originPath, functions);
  const filteredResponse = filterInvalidGetAllResponses(
    getAllResponse, constructorsObject.settings,
  );
  if (mayGetAllResponseBeMapped(filteredResponse, constructorsObject.settings)) {
    constructorsObject.destinationObject.setAll(
      destinationPath,
      validateReponseAndPassDefault(
        filteredResponse, [], constructorsObject.settings.defaultGetAllResponse,
      ),
      functions,
      constructorsObject.settings,
    );
  }
  return getAllResponse;
};

module.exports = translateAllSerivce;
