/**
 * Logical check for functions
 * @param {Any} variableA variable to check
 * @param {Any} variableB not used
 * @param {String} operator not used
 * @param {Any} element (remaining) element that needs to be checked
 * @returns {Boolean} indicator whether logical check for ? suffices
 */
const checkFunctions = (variableA, variableB, operator, element) => {
  if (variableA && variableA.function) {
    return variableA.function(element);
  }
  return null;
};

module.exports = checkFunctions;
