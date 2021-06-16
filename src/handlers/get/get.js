const JsonGo = require('../../../index');
const getSinglePathElement = require('../../helpers/pathElements/getSingle');
const doesPathIndicateComplexity = require('./src/doesPathIndicateComplexity');
const simpleGet = require('./src/simpleGet');
const validateOutput = require('./src/validateOutput');
const getAllKeysFromObject = require('../../helpers/pathElements/getKeys/getAllKeysFromObject');
const getAllKeysFromArray = require('../../helpers/pathElements/getKeys/getAllKeysFromArray');
const getTypeFromTempObject = require('./src/getTypeFromTempObject');
const initializeGetHandler = require('./src/initializeGetHandler');

/**
 * Handle wildcard, checks for each key whether remaining path is found and returns first key that
 * matches
 */
const getFirstKey = (
  tempObject, arrayPath, getType, index, obj, priorPath, functions, settings,
) => {
  const keys = getType === 'number' ? getAllKeysFromArray(tempObject, settings) : getAllKeysFromObject(tempObject, settings);
  let result;
  keys.some((key) => {
    let iterationResult;
    const remainingPath = arrayPath.slice(index + 1);
    if (doesPathIndicateComplexity(remainingPath)) {
      iterationResult = JsonGo.get(obj, [...priorPath, key, ...remainingPath], functions, settings);
    } else {
      iterationResult = simpleGet(tempObject, [key, ...remainingPath], settings);
    }
    if (iterationResult !== undefined) {
      result = key[getType];
      return true;
    }
    return false;
  });
  return result;
};

/**
 * Get name of element either from wildcard or from other type of element
 */
const getPathElement = (
  element, obj, tempObject, getType, priorPath, arrayPath, index, functions, settings,
) => {
  if (element.wildcard) {
    return getFirstKey(tempObject, arrayPath, getType, index, obj, priorPath, functions, settings);
  }
  return getSinglePathElement(element, obj, tempObject, getType, priorPath, functions, settings);
};

/**
 * For each element of the array path, get its element and return whether a next
 * iterations is desired
 */
const getIteration = (
  element, obj, tempObject, type, priorPath, arrayPath, index, functions, settingsObject,
) => {
  let tempObj = tempObject;
  const arrPath = arrayPath;
  const elementValue = getPathElement(
    element, obj, tempObject, type, priorPath, arrayPath, index, functions, settingsObject,
  );
  tempObj = tempObj[elementValue];
  arrPath[index] = elementValue;
  const priorPathElement = {};
  priorPathElement[type] = elementValue;
  priorPath.push(priorPathElement);
  return validateOutput(tempObj, arrPath.length - 1 === index);
};

/**
 * Retreives single value from objects specified path
 * @param {Object} obj - object/array from which value should be retreived.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {any} returns value found at specified path, in case that multiple logical checks
 * satisfy the first element will be returned
 */
const get = (obj, path, functions, settings) => {
  const { settingsObject, arrayPath, priorPath } = initializeGetHandler(path, functions, settings);
  if (!doesPathIndicateComplexity(arrayPath)) {
    return simpleGet(obj, arrayPath);
  }
  let tempObject = obj;
  arrayPath.every((element, index) => {
    const type = getTypeFromTempObject(tempObject);
    const { shouldItContinue, newTempObject } = getIteration(
      element, obj, tempObject, type, priorPath, arrayPath, index, functions, settingsObject,
    );
    tempObject = newTempObject;
    return shouldItContinue;
  });
  return tempObject;
};

module.exports = get;
