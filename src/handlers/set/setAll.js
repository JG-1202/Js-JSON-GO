const pathTransformer = require('../../helpers/pathTransformer');
const getPathElements = require('../../helpers/pathElements/getMultiple');
const setElement = require('./src/setElement');
const getAllKeysFromArray = require('../../helpers/pathElements/getKeys/getAllKeysFromArray');
const getAllKeysFromObject = require('../../helpers/pathElements/getKeys/getAllKeysFromObject');
const backwardCompatability = require('./src/backwardCompatability');
const returnObject = require('../../helpers/returnObject');

/**
 * Get key values of all elements that need to be set
 */
// eslint-disable-next-line complexity
const getElementValues = (element, obj, tempObject, priorPath, functions, settings) => {
  if (Array.isArray(tempObject)) {
    return element.wildcard ? getAllKeysFromArray(tempObject, settings) : getPathElements(element, obj, tempObject, 'number', priorPath, functions, settings);
  }
  return element.wildcard ? getAllKeysFromObject(tempObject, settings) : getPathElements(element, obj, tempObject, 'string', priorPath, functions, settings);
};

/**
 * Get value from element in object
 */
const getElementValue = (element) => {
  const resultKeys = Object.keys(element);
  return element[resultKeys[0]];
};

/**
 * Sets single value on specified path
 * @param {object} obj - object
 * @param {any} path - string or array representation of path to set.
 * @param {any} val - value to be set at specified path.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {object} object with newly set path in case that multiple logical checks
 * satisfy the first element will be set.
 */
const setAll = (obj, path, val, functions, settings) => {
  const backwardCompatabilityObject = backwardCompatability(functions, settings);
  const { functionsObject } = backwardCompatabilityObject;
  const settingsObject = returnObject(backwardCompatabilityObject.settingsObject);
  const arrayPath = pathTransformer(path, functionsObject);
  const priorPath = [];
  let tempObject = obj;

  arrayPath.every((element, index) => {
    const elementValues = getElementValues(
      element, obj, tempObject, priorPath, functions, settingsObject,
    );
    if (elementValues.length === 1) {
      const elementValue = getElementValue(elementValues[0]);
      tempObject = setElement(
        elementValue, tempObject, arrayPath[index + 1], arrayPath.length - 1 === index, val,
      );
      // eslint-disable-next-line prefer-destructuring
      arrayPath[index] = elementValues[0];
      priorPath.push(elementValues[0]);
      return true;
    } if (elementValues.length > 1) {
      elementValues.forEach((elementValue) => {
        const newPath = [
          ...arrayPath.slice(0, index), elementValue, ...arrayPath.slice(index + 1),
        ];
        return setAll(obj, newPath, val, functionsObject, settingsObject);
      });
      return false;
    }
    return false;
  });
  return obj;
};

module.exports = setAll;
