const JsonGo = require('../../../index');
const pathTransformer = require('../../helpers/pathTransformer');
const getSinglePathElement = require('../../helpers/pathElements/getSingle');
const doesPathIndicateComplexity = require('./src/doesPathIndicateComplexity');
const simpleGet = require('./src/simpleGet');
const validateOutput = require('./src/validateOutput');
const getAllKeysFromObject = require('../../helpers/pathElements/getKeys/getAllKeysFromObject');
const getAllKeysFromArray = require('../../helpers/pathElements/getKeys/getAllKeysFromArray');

/**
 * Handle wildcard, checks for each key whether remaining path is found and returns first key that
 * matches
 */
const getFirstKey = (tempObject, arrayPath, getType, index, obj, priorPath) => {
  const keys = getType === 'number' ? getAllKeysFromArray(tempObject) : getAllKeysFromObject(tempObject);
  let result;
  keys.some((key) => {
    let iterationResult;
    const remainingPath = arrayPath.slice(index + 1);
    if (doesPathIndicateComplexity(remainingPath)) {
      iterationResult = new JsonGo.Json(obj).get([...priorPath, key, ...remainingPath]);
    } else {
      iterationResult = simpleGet(tempObject, [key, ...remainingPath]);
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
const getPathElement = (element, obj, tempObject, getType, priorPath, arrayPath, index) => {
  if (element.wildcard) {
    return getFirstKey(tempObject, arrayPath, getType, index, obj, priorPath);
  }
  return getSinglePathElement(element, obj, tempObject, getType, priorPath);
};

/**
 * Retreives single value from objects specified path
 * @param {Object} obj - object/array from which value should be retreived.
 * @param {any} path - string or array representation of path to set.
 * @returns {any} returns value found at specified path, in case that multiple logical checks
 * satisfy the first element will be returned
 */
const get = (obj, path, functions) => {
  const arrayPath = pathTransformer(path, functions);
  if (!doesPathIndicateComplexity(arrayPath)) {
    return simpleGet(obj, arrayPath);
  }
  const priorPath = [];
  let tempObject = obj;
  arrayPath.every((element, index) => {
    if (Array.isArray(tempObject)) {
      const elementValue = getPathElement(element, obj, tempObject, 'number', priorPath, arrayPath, index);
      tempObject = tempObject[elementValue];
      arrayPath[index] = elementValue;
      priorPath.push({ number: elementValue });
    } else {
      const elementValue = getPathElement(element, obj, tempObject, 'string', priorPath, arrayPath, index);
      tempObject = tempObject[elementValue];
      arrayPath[index] = elementValue;
      priorPath.push({ string: elementValue });
    }
    const {
      shouldItContinue, newTempObject,
    } = validateOutput(tempObject, arrayPath.length - 1 === index);
    tempObject = newTempObject;
    return shouldItContinue;
  });
  return tempObject;
};

module.exports = get;
