/**
 * Validate whether getAll response may be mapped based on response and settings
 * @param {Any} getResponse response from getAll function
 * @param {Object} settings object with settings
 * @returns {Boolean}
 */
const mayGetAllResponseBeMapped = (getAllResponse, settings) => (
  settings.mapIfNotFound || getAllResponse.length > 0
);

module.exports = mayGetAllResponseBeMapped;
