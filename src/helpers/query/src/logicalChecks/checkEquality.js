/* eslint complexity: ["error", 8] */

/**
 * Check whether both variableA and variableB are truthy
 */
const doVariablesExist = (variableA, variableB) => (variableA && variableB);

/**
 * Check whether both variableA and variable B are of type object
 */
const areVariablesOfTypeObject = (variableA, variableB) => (typeof variableA === 'object' && typeof variableB === 'object');

/**
 * Check whether both variableA and variable B are objects
 */
const areBothVariablesObjects = (variableA, variableB) => {
  if (doVariablesExist(variableA, variableB) && areVariablesOfTypeObject(variableA, variableB)) {
    return true;
  }
  return false;
};

/**
 * Check whether both variableA and variable B are arrays
 */
const areBothVariablesArrays = (variableA, variableB) => {
  if (Array.isArray(variableA) && Array.isArray(variableB)) {
    return true;
  }
  return false;
};

/**
 * Checks whether variableA and variableB are equal including JSON equality
 */
const isEqual = (variableA, variableB) => {
  if (variableA === variableB) {
    return true;
  }
  if (areBothVariablesObjects(variableA, variableB)) {
    let result = false;
    if (Object.keys(variableA).length !== Object.keys(variableB).length) {
      return false;
    }
    if (Object.keys(variableA).length === 0) {
      return true;
    }
    Object.keys(variableA).every((keyA) => {
      result = isEqual(variableA[keyA], variableB[keyA]);
      return result;
    });
    return result;
  }
  if (areBothVariablesArrays(variableA, variableB)) {
    let result = false;
    if (variableA.length !== variableB.length) {
      return false;
    }
    if (variableA.length === 0) {
      return true;
    }
    variableA.every((valueA, index) => {
      result = isEqual(valueA, variableB[index]);
      return result;
    });
    return result;
  }
  return false;
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
    return { stop: true, result: isEqual(variableA, variableB) };
  }
  if (operator === '!=') {
    return { stop: true, result: !isEqual(variableA, variableB) };
  }
  return { stop: false };
};

module.exports = checkEquality;
