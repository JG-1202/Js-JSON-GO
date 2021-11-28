/**
 * Check whether both variableA and variable B are objects
 */
const areBothVariablesObjectsOfEqualLength = (variableA, variableB) => {
  const checks = [
    (varA) => !!varA,
    (varA, varB) => !!varB,
    (varA) => typeof varA === 'object',
    (varA, varB) => typeof varB === 'object',
    (varA) => !Array.isArray(varA),
    (varA, varB) => !Array.isArray(varB),
    (varA, varB) => Object.keys(varA).length === Object.keys(varB).length,
  ];
  return checks.every((check) => check(variableA, variableB));
};

/**
 * Check whether both variableA and variable B are arrays
 */
const areBothVariablesArraysOfEqualLength = (variableA, variableB) => {
  const checks = [
    (varA) => Array.isArray(varA),
    (varA, varB) => Array.isArray(varB),
    (varA, varB) => varA.length === varB.length,
  ];
  return checks.every((check) => check(variableA, variableB));
};

const checks = {
  /**
   * Check equality of two variables
   */
  isEqual(variableA, variableB) {
    if (variableA === variableB) {
      return true;
    }
    return this.checkJsonEquality(variableA, variableB);
  },
  /**
   * Check equality of two JSON variables
   */
  checkJsonEquality(variableA, variableB) {
    if (areBothVariablesArraysOfEqualLength(variableA, variableB)) {
      return variableA.every((valueA, index) => this.isEqual(valueA, variableB[index]));
    }
    if (areBothVariablesObjectsOfEqualLength(variableA, variableB)) {
      return Object.keys(variableA).every((keyA) => this.isEqual(variableA[keyA], variableB[keyA]));
    }
    return false;
  },
};

/**
 * Logical check for operators = and !=
 * @param {Any} variableA variable to check
 * @param {Any} variableB variable to check against
 * @param {String} operator operator (check for = and !=)
 * @returns {Boolean} indicator whether logical check for = or != suffices
 */
const checkEquality = (variableA, variableB, operator) => {
  if (operator === '=') {
    return checks.isEqual(variableA, variableB);
  }
  if (operator === '!=') {
    return !checks.isEqual(variableA, variableB);
  }
  return null;
};

module.exports = checkEquality;
