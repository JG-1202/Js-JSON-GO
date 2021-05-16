/**
 * Logical check for functions
 * @param {Any} variable variable to check
 * @param {Any} element (remaining) element that needs to be checked
 * @returns {Boolean} indicator whether logical check for ? suffices
 */
const checkFunctions = (variable, element) => {
  if (variable && variable.function) {
    return { stop: true, result: variable.function(element) };
  }
  return { stop: false };
};

module.exports = checkFunctions;
