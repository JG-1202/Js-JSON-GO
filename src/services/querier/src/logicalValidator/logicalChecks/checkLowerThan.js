/**
 * Logical check for operators < and <=
 * @param {any} variableA variable to check
 * @param {any} variableB variable to check against
 * @param {string} operator operator (check for < and <=)
 * @returns {boolean} indicator whether logical check for < or <= suffices
 */
const checkLowerThan = (variableA, variableB, operator) => {
  if (operator === '<') {
    return variableA < variableB;
  }
  if (operator === '<=') {
    return variableA <= variableB;
  }
  return null;
};

module.exports = checkLowerThan;
