const _ = require('lodash');

/**
 * Logical check for operators = and !=
 * @param {Any} variableA variable to check
 * @param {Any} variableB variable to check against
 * @param {String} operator operator (check for = and !=)
 * @returns {Boolean} indicator whether logical check for = or != suffices
 */
const checkEquality = (variableA, variableB, operator) => {
  if (operator === '=') {
    return _.isEqual(variableA, variableB);
  }
  if (operator === '!=') {
    return !_.isEqual(variableA, variableB);
  }
  return null;
};

module.exports = checkEquality;
