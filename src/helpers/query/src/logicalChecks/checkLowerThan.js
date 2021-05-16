/**
 * Logical check for operators < and <=
 * @param {Any} variableA variable to check
 * @param {Any} variableB variable to check against
 * @param {String} operator operator (check for < and <=)
 * @returns {Boolean} indicator whether logical check for < or <= suffices
 */
const checkLowerThan = (variableA, variableB, operator) => {
  if (operator === '<') {
    return { stop: true, result: variableA < variableB };
  }
  if (operator === '<=') {
    return { stop: true, result: variableA <= variableB };
  }
  return { stop: false };
};

module.exports = checkLowerThan;
