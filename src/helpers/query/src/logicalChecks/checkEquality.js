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
 * Check whether variables length indicate equality
 */
const checkVariablesLength = (variableA, variableB) => {
  if (variableA.length !== variableB.length) {
    return false;
  }
  if (variableA.length === 0) {
    return true;
  }
  return null;
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
    if (areBothVariablesObjects(variableA, variableB)) {
      return this.checkObjectEquality(variableA, variableB);
    }
    if (areBothVariablesArrays(variableA, variableB)) {
      return this.checkArrayEquality(variableA, variableB);
    }
    return false;
  },
  /**
   * Check equality of two objects
   */
  checkObjectEquality(objectA, objectB) {
    const lengthCheck = checkVariablesLength(Object.keys(objectA), Object.keys(objectB));
    return lengthCheck === null
      ? Object.keys(objectA).every((keyA) => this.isEqual(objectA[keyA], objectB[keyA]))
      : lengthCheck;
  },
  /**
   * Check equality of two arrays
   */
  checkArrayEquality(arrayA, arrayB) {
    const lengthCheck = checkVariablesLength(arrayA, arrayB);
    return lengthCheck === null
      ? arrayA.every((valueA, index) => this.isEqual(arrayA, arrayB[index]))
      : lengthCheck;
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
