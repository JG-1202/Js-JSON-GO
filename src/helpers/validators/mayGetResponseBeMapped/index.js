/**
 * Filter invalid responses (defined in ignoreOnTranslate setting).
 */
const filterInvalidResponses = (getResponse, settings) => {
  if (settings.ignoreOnTranslate.indexOf(getResponse) === -1) {
    return getResponse;
  }
  return undefined;
};

/**
 * Validate whether get response may be mapped based on response and settings
 * @param {Any} getResponse response from get function
 * @param {Object} settings object with settings
 * @returns {Boolean}
 */
const mayGetResponseBeMapped = (getResponse, settings) => {
  const filteredResponse = filterInvalidResponses(getResponse, settings);
  return settings.mapIfNotFound || filteredResponse !== undefined;
};

module.exports = mayGetResponseBeMapped;
