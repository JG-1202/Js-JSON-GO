const checkEquality = require('../../query/src/logicalChecks/checkEquality');

/**
 * Filter invalid getAll responses as defined in ignoreOnTranslate settings
 * @param {Array} getAllResponse getAll response from originObject
 * @param {Object} settings object with settings
 * @returns {Array} array with filtered responses
 */
const filterInvalidGetAllResponses = (getAllResponse, settings) => (
  getAllResponse.filter(
    (el) => settings.ignoreOnTranslate.every((toIgnore) => checkEquality(el.value, toIgnore, '!=')),
  )
);

module.exports = filterInvalidGetAllResponses;
