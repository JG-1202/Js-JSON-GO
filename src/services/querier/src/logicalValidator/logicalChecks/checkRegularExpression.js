/**
 * Test regular expression for either variableA or variableB
 */
const testExpression = (variableA, variableB) => {
  if (variableB.regex) {
    return variableB.regex.test(variableA);
  }
  if (variableA.regex) {
    return variableA.regex.test(variableB);
  }
  return false;
};

/**
 * Logical check for operator ?
 * @param {any} variableA variable to check
 * @param {any} variableB variable to check against
 * @param {string} operator operator (check for ?)
 * @returns {boolean} indicator whether logical check for ? suffices
 */
const checkRegularExpression = (variableA, variableB, operator) => {
  if (operator === '?') {
    return testExpression(variableA, variableB);
  }
  return null;
};

module.exports = checkRegularExpression;
