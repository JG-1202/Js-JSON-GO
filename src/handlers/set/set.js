const pathTransformer = require('../../helpers/pathTransformer');
const getPathElement = require('../../helpers/pathElements/getSingle');
const getFirstKeyFromArray = require('../../helpers/pathElements/getKeys/getFirstKeyFromArray');
const getFirstKeyFromObject = require('../../helpers/pathElements/getKeys/getFirstKeyFromObject');
const setElement = require('./src/setElement');

/**
 * Get key value of element to be set
 */
// eslint-disable-next-line complexity
const getElementValue = (element, obj, tempObject, priorPath, fatalError) => {
  if (Array.isArray(tempObject)) {
    const result = element.wildcard ? getFirstKeyFromArray(tempObject, fatalError) : getPathElement(element, obj, tempObject, 'number', priorPath, fatalError);
    priorPath.push({ number: result });
    return result;
  }
  const result = element.wildcard ? getFirstKeyFromObject(tempObject, fatalError) : getPathElement(element, obj, tempObject, 'string', priorPath, fatalError);
  priorPath.push({ string: result });
  return result;
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
const set = (obj, path, val, fatalError, functions) => {
  const arrayPath = pathTransformer(path, functions);
  const priorPath = [];
  let tempObject = obj;
  let elementValue;

  arrayPath.every((element, index) => {
    elementValue = getElementValue(element, obj, tempObject, priorPath, fatalError);
    if (elementValue !== undefined) {
      tempObject = setElement(
        elementValue, tempObject, arrayPath[index + 1], arrayPath.length - 1 === index, val,
      );
      arrayPath[index] = elementValue;
      return true;
    }
    return false;
  });
  return obj;
};

module.exports = set;
