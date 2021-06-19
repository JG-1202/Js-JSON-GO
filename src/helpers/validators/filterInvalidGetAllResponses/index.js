/**
 * Filter invalid getAll responses as defined in ingnoreOnTranslate settings
 * @param {Array} getAllResponse getAll response from originObject
 * @param {Object} settings object with settings
 * @returns {Array} array with filtered responses
 */
const filterInvalidGetAllResponses = (getAllResponse, settings) => (
  getAllResponse.filter(
    (el) => settings.ingnoreOnTranslate.indexOf(el) === -1,
  )
);

module.exports = filterInvalidGetAllResponses;
