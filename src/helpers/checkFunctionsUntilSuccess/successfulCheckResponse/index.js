/**
 * Default response to be expected on successfull check on checkFunctionsUntilSuccess
 * @param {Any} result result from function
 * @returns {Object} object with result key containing input and success = true
 */
const defaultResponse = (result) => ({ result, success: true });

module.exports = defaultResponse;
