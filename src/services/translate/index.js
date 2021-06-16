const validateReponseAndPassDefault = require('../../helpers/validateReponseAndPassDefault');

/**
 * translate service to be called from class
 * @param {String} originPath path from where data should be obtained from origin object
 * @param {originPath} destinationPath path to where data should be mapped into destination
 * object
 * @param {Object} constructorsObject this constructors object
 * @returns translate response
 */
const translateSerivce = (originPath, destinationPath, functions, constructorsObject) => {
  const getResponse = constructorsObject.originObject.get(originPath, functions);
  if (constructorsObject.settings.mapIfNotFound || getResponse !== undefined) {
    constructorsObject.destinationObject.set(
      destinationPath,
      validateReponseAndPassDefault(
        getResponse, undefined, constructorsObject.settings.defaultGetResponse,
      ),
      functions,
      constructorsObject.settings,
    );
  }
  return getResponse;
};

module.exports = translateSerivce;
