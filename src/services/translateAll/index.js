const validateReponseAndPassDefault = require('../../helpers/validateReponseAndPassDefault');

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
  if (constructorsObject.settings.mapIfNotFound || getAllResponse.length > 0) {
    constructorsObject.destinationObject.setAll(
      destinationPath,
      validateReponseAndPassDefault(
        getAllResponse, [], constructorsObject.settings.defaultGetAllResponse,
      ),
      functions,
      constructorsObject.settings,
    );
  }
  return getAllResponse;
};

module.exports = translateAllSerivce;
