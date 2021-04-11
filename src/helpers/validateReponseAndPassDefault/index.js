/**
 * check if both variables are an empty array
 */
const bothAreEmptyArray = (value1, value2) => {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length === 0 && value2.length === 0) {
      return true;
    }
  }
  return false;
};

/**
 * Check response against responseDefault and pass settingsDefault
 * @param {Any} response - response to be testen
 * @param {Any} responseDefault - default response from function
 * @param {Any} settingsDefault - settings default response
 * @returns {Any} response, or settings default if response was responseDefault
 */
const validateResponseAndPassDefault = (response, responseDefault, settingsDefault) => {
  if (settingsDefault !== undefined
    && (response === responseDefault || bothAreEmptyArray(response, responseDefault))
  ) {
    return settingsDefault;
  }
  return response;
};

module.exports = validateResponseAndPassDefault;
