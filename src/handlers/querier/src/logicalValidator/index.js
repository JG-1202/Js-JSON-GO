const checkEquality = require('./logicalChecks/checkEquality');
const checkFunctions = require('./logicalChecks/checkFunctions');
const checkGreaterThan = require('./logicalChecks/checkGreaterThan');
const checkInSubsetOf = require('./logicalChecks/checkInSubsetOf');
const checkLowerThan = require('./logicalChecks/checkLowerThan');
const checkRegularExpression = require('./logicalChecks/checkRegularExpression');

/**
 * Default check (!!value) will return boolean from value input
 */
const defaultCheck = (value) => !!value;

/**
 * Checks value with checkValue depending on operator
 * @param {Array} value - input value to check
 * @param {String} operator - operator
 * @param {Any} checkValue - other input value to check agains value
 * @param {Any} element - element to be checked
 * @returns {Boolean} - true if it complies, false otherwise
 */
const logicalValidator = (value, operator, checkValue, element) => {
  const checks = [
    checkEquality,
    checkGreaterThan,
    checkLowerThan,
    checkInSubsetOf,
    checkRegularExpression,
    checkFunctions,
    defaultCheck,
  ];
  let result;
  checks.some((check) => {
    const functionOutput = check(
      value, checkValue, operator, element,
    );
    if (typeof functionOutput === 'boolean') {
      result = functionOutput;
      return true;
    }
    return false;
  });
  return result;
};

module.exports = logicalValidator;
