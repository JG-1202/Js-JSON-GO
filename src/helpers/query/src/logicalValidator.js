const stringify = require('../../../handlers/basic/stringify');

/**
 * Checks value with checkValue depending on operator
 * @param {Array} value - input value to check
 * @param {String} operator - operator
 * @param {Any} checkValue - other input value to check agains value
 * @returns {Boolean} - true if it complies, false otherwise
 */
// eslint-disable-next-line complexity
const logicalValidator = (value, operator, checkValue) => {
  if (operator === '=') {
    return (stringify(value) === stringify(checkValue));
  }
  if (operator === '!=') {
    return (stringify(value) !== stringify(checkValue));
  }
  if (operator === '>=') {
    return (value >= checkValue);
  }
  if (operator === '>') {
    return (value > checkValue);
  }
  if (operator === '<=') {
    return (value <= checkValue);
  }
  if (operator === '<') {
    return (value < checkValue);
  }
  if (operator === '∈' || operator === '@') {
    return (checkValue.indexOf(value) > -1);
  }
  if (operator === '∉' || operator === '!@') {
    return (checkValue.indexOf(value) === -1);
  }
  if (operator === '?') {
    if(checkValue.regex) {
      return checkValue.regex.test(value);
    }
    if(value.regex){
      return value.regex.test(checkValue);
    }
    return false;
  }
  return !!value;
};

module.exports = logicalValidator;
