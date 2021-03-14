const unlink = require('../basic/unlink.js');
const pathTransformer = require('../../helpers/pathTransformer');
const getPathElements = require('../../helpers/pathElements/getMultiple');
const setElement = require('./src/setElement');
const getAllKeysFromArray = require('../../helpers/pathElements/getKeys/getAllKeysFromArray');
const getAllKeysFromObject = require('../../helpers/pathElements/getKeys/getAllKeysFromObject');

/**
 * Get key values of all elements that need to be set
 */
// eslint-disable-next-line complexity
const getElementValues = (element, obj, tempObject, priorPath, fatalError) => {
  if (Array.isArray(tempObject)) {
    return element.wildcard ? getAllKeysFromArray(tempObject, fatalError) : getPathElements(element, unlink(obj), tempObject, 'number', priorPath, fatalError);
  }
  return element.wildcard ? getAllKeysFromObject(tempObject, fatalError) : getPathElements(element, unlink(obj), tempObject, 'string', priorPath, fatalError);
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
 * @param {boolean} fatalError - true if fatal error is desired if logical check is not satisfied.
 * @returns {object} object with newly set path in case that multiple logical checks
 * satisfy the first element will be set.
 */
const setAll = (obj, path, val, fatalError) => {
  const arrayPath = pathTransformer(path);
  const priorPath = [];
  let tempObject = obj;

  arrayPath.every((element, index) => {
    const elementValues = getElementValues(element, obj, tempObject, priorPath, fatalError);
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
        return setAll(obj, newPath, val, fatalError);
      });
      return false;
    }
    return false;
  });
  return obj;
};

module.exports = setAll;
