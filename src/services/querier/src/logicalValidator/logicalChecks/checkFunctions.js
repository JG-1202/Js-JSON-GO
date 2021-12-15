/**
 * Logical check for functions
 * @param {any} variableA variable to check
 * @param {any} variableB not used
 * @param {string} operator not used
 * @param {any} element (remaining) element that needs to be checked
 * @returns {boolean} indicator whether logical check for ? suffices
 */
const checkFunctions = (variableA, variableB, operator, element) => {
  if (variableA && variableA.function) {
    return variableA.function(element);
  }
  return null;
};

module.exports = checkFunctions;
