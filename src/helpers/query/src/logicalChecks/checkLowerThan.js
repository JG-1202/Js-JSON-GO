/**
 * Logical check for operators < and <=
 * @param {Any} variableA variable to check
 * @param {Any} variableB variable to check against
 * @param {String} operator operator (check for < and <=)
 * @returns {Boolean} indicator whether logical check for < or <= suffices
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
