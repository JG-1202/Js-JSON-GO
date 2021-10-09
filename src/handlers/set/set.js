const getPathElement = require('../../helpers/pathElements/getSingle');
const getFirstKeyFromArray = require('../../helpers/pathElements/getKeys/getFirstKeyFromArray');
const getFirstKeyFromObject = require('../../helpers/pathElements/getKeys/getFirstKeyFromObject');
const setElement = require('./src/setElement');
const defineConstants = require('./src/defineConstants');

/**
 * Get key value of element to be set
 */
// eslint-disable-next-line complexity
const getElementValue = (element, obj, tempObject, priorPath, functions, settings) => {
  if (Array.isArray(tempObject)) {
    const result = element.wildcard ? getFirstKeyFromArray(tempObject, settings) : getPathElement(element, obj, tempObject, 'number', priorPath, functions, settings);
    priorPath.push({ number: result });
    return result;
  }
  const result = element.wildcard ? getFirstKeyFromObject(tempObject, settings) : getPathElement(element, obj, tempObject, 'string', priorPath, functions, settings);
  priorPath.push({ string: result });
  return result;
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
const set = (obj, path, val, functions, settings) => {
  const {
    settingsObject, arrayPath, priorPath,
  } = defineConstants(path, functions, settings);
  let tempObject = obj;
  let elementValue;

  arrayPath.every((element, index) => {
    elementValue = getElementValue(
      element, obj, tempObject, priorPath, functions, settingsObject,
    );
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
