const validateReponseAndPassDefault = require('../../helpers/validators/validateReponseAndPassDefault');
const mayGetResponseBeMapped = require('../../helpers/validators/mayGetResponseBeMapped');
const mayGetAllResponseBeMapped = require('../../helpers/validators/mayGetAllResponseBeMapped');
const filterInvalidGetAllResponses = require('../../helpers/validators/filterInvalidGetAllResponses');

/**
 * select set or setAll based on translateType and call function
 */
const setFunction = (
  translateType, constructorsObject, destinationPath, toBeMapped, functions,
) => {
  const validatedResponse = validateReponseAndPassDefault(
    toBeMapped.response,
    toBeMapped.defaultResponse,
    toBeMapped.defaultSettingsResponse,
  );
  if (['translateSingle', 'translateAllToOne'].indexOf(translateType) > -1) {
    return constructorsObject.destinationObject.set(
      destinationPath,
      validatedResponse,
      functions,
      constructorsObject.settings,
    );
  }
  return constructorsObject.destinationObject.setAll(
    destinationPath,
    validatedResponse,
    functions,
    constructorsObject.settings,
  );
};

/**
 * get from originObject and check whether it should be mapped onto destinationObject
 */
const getToBeMapped = (constructorsObject, originPath, functions) => {
  let shouldBeMapped = false;
  const defaultResponse = undefined;
  const defaultSettingsResponse = constructorsObject.settings.defaultGetResponse;
  const response = constructorsObject.originObject.get(originPath, functions);
  if (mayGetResponseBeMapped(response, constructorsObject.settings)) {
    shouldBeMapped = true;
  }
  return {
    response, shouldBeMapped, defaultResponse, defaultSettingsResponse,
  };
};

/**
 * getAll from originObject and check whether it should be mapped onto destinationObject
 */
const getAllToBeMapped = (constructorsObject, originPath, functions) => {
  let shouldBeMapped = false;
  const defaultResponse = [];
  const defaultSettingsResponse = constructorsObject.settings.defaultGetAllResponse;
  const getAllResponse = constructorsObject.originObject.getAll(originPath, functions);
  const response = filterInvalidGetAllResponses(
    getAllResponse, constructorsObject.settings,
  );
  if (mayGetAllResponseBeMapped(response, constructorsObject.settings)) {
    shouldBeMapped = true;
  }
  return {
    response, shouldBeMapped, defaultResponse, defaultSettingsResponse,
  };
};

/**
 * translate service to be called from class
 * @param {String} translateType translateSingle, translateAll, translateAllToOne, translateOneToAll
 * @param {String} originPath path from where data should be obtained from origin object
 * @param {originPath} destinationPath path to where data should be mapped into destination
 * object
 * @param {Object} constructorsObject this constructors object
 * @returns translate response
 */
const translateSerivce = (
  translateType, originPath, destinationPath, functions, constructorsObject,
) => {
  let toBeMapped = {};
  if (['translateSingle', 'translateOneToAll'].indexOf(translateType) > -1) {
    toBeMapped = getToBeMapped(constructorsObject, originPath, functions);
  } else {
    toBeMapped = getAllToBeMapped(constructorsObject, originPath, functions);
  }
  if (toBeMapped.shouldBeMapped) {
    setFunction(
      translateType, constructorsObject, destinationPath, toBeMapped, functions,
    );
  }
  return toBeMapped.originResponse;
};

module.exports = translateSerivce;
