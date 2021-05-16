/* eslint complexity: ["error", 7] */

const checkEquality = require('./logicalChecks/checkEquality');
const checkFunctions = require('./logicalChecks/checkFunctions');
const checkGreaterThan = require('./logicalChecks/checkGreaterThan');
const checkInSubsetOf = require('./logicalChecks/checkInSubsetOf');
const checkLowerThan = require('./logicalChecks/checkLowerThan');
const checkRegularExpression = require('./logicalChecks/checkRegularExpression');

/**
 * Checks value with checkValue depending on operator
 * @param {Array} value - input value to check
 * @param {String} operator - operator
 * @param {Any} checkValue - other input value to check agains value
 * @param {Any} element - element to be checked
 * @returns {Boolean} - true if it complies, false otherwise
 */
const logicalValidator = (value, operator, checkValue, element) => {
  const equalityResult = checkEquality(value, checkValue, operator);
  if (equalityResult.stop) {
    return equalityResult.result;
  }
  const greaterThanResult = checkGreaterThan(value, checkValue, operator);
  if (greaterThanResult.stop) {
    return greaterThanResult.result;
  }
  const lowerThanResult = checkLowerThan(value, checkValue, operator);
  if (lowerThanResult.stop) {
    return lowerThanResult.result;
  }
  const subsetResult = checkInSubsetOf(value, checkValue, operator);
  if (subsetResult.stop) {
    return subsetResult.result;
  }
  const regularExpressionResult = checkRegularExpression(value, checkValue, operator);
  if (regularExpressionResult.stop) {
    return regularExpressionResult.result;
  }
  const functionResult = checkFunctions(value, element);
  if (functionResult.stop) {
    return functionResult.result;
  }
  return !!value;
};

module.exports = logicalValidator;
