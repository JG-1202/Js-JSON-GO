/**
 * Logical check whether element is an object
 */
const isElementObject = (element) => (element && typeof element === 'object');

/**
 * Validate output and return newTempObject and boolean whether getAll should continue
 * for next element
 * @param {Object} tempObject - object/array of current iteration
 * @param {Boolean} isLastIteration - indicator whether it is the final iteration
 * @returns {Object} Object with shouldItContinue and newTempObject
 */
const validateOutput = (tempObject, isLastIteration) => {
  if (isElementObject(tempObject)) {
    return { shouldItContinue: true, newTempObject: tempObject };
  }
  if (!isLastIteration) {
    return { shouldItContinue: false, newTempObject: undefined };
  }
  return { shouldItContinue: false, newTempObject: tempObject };
};

module.exports = validateOutput;
