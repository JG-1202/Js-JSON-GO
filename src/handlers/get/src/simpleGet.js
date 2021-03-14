const validateOutput = require('./validateOutput');

/**
 * Retreives single value from objects specified path from a simple format
 * (array representation, without queries)
 * @param {Object} obj - object/array from which value should be retreived.
 * @param {Array} path - array representation of path to set.
 * @returns {any} returns value found at specified path, in case that multiple logical checks
 * satisfy the first element will be returned
 */
const simpleGet = (obj, path) => {
  const arrayPath = path;
  let tempObject = obj;
  arrayPath.every((element, index) => {
    if (Array.isArray(tempObject)) {
      const elementValue = element.number;
      tempObject = tempObject[elementValue];
    } else {
      const elementValue = element.string;
      tempObject = tempObject[elementValue];
    }
    const {
      shouldItContinue, newTempObject,
    } = validateOutput(tempObject, arrayPath.length - 1 === index);
    tempObject = newTempObject;
    return shouldItContinue;
  });
  return tempObject;
};

module.exports = simpleGet;
