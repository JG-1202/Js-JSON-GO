const JsonGo = require('../../../index');

const getSinglePathElement = require('../../helpers/pathElements/getSingle');
const doesPathIndicateComplexity = require('./src/doesPathIndicateComplexity');
const simpleGet = require('./src/simpleGet');
const validateOutput = require('./src/validateOutput');
const getAllKeysFromObject = require('../../helpers/pathElements/getKeys/getAllKeysFromObject');
const getAllKeysFromArray = require('../../helpers/pathElements/getKeys/getAllKeysFromArray');
const getTypeFromTempObject = require('./src/getTypeFromTempObject');
const initializeGetHandler = require('./src/initializeGetHandler');
const updateReferences = require('./src/updateReferences');
const makeObject = require('../make/makeObject');

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
  element, obj, tempObject, getType, priorPath, arrayPath, index, functions, settings, refObject,
) => {
  if (element.wildcard) {
    return getFirstKey(tempObject, arrayPath, getType, index, obj, priorPath, functions, settings);
  }
  return getSinglePathElement(
    element, obj, tempObject, getType, priorPath, functions, settings, refObject,
  );
};

/**
 * For each element of the array path, get its element and return whether a next
 * iterations is desired
 */
const getIteration = (
  element, obj, tempObject, type, priorPath, arrayPath, index, functions, settingsObject, refObject,
) => {
  let tempObj = tempObject;
  const arrPath = arrayPath;
  const elementValue = getPathElement(
    element, obj, tempObject, type, priorPath, arrayPath, index, functions,
    settingsObject, refObject,
  );
  tempObj = tempObj[elementValue];
  arrPath[index] = elementValue;
  const priorPathElement = {};
  priorPathElement[type] = elementValue;
  priorPath.push(priorPathElement);
  updateReferences(refObject, tempObj, element, elementValue);
  return validateOutput(tempObj, arrPath.length - 1 === index);
};

/**
 * returns value with corresponding path, if no value is found, no path is returned
 */
const returnResult = (value, path, references) => {
  if (value !== undefined) {
    return { value, path, references };
  }
  return { value: undefined, path: undefined };
};

/**
 * Retrieves single value and resolved path from objects specified path
 * @param {Object} obj - object/array from which value should be retrieved.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @param {Object} referenceObject - object with (resolved) references.
 * @returns {any} returns value and resolved path found at specified path,
 * in case that multiple logical checks satisfy the first element will be returned
 */
const resolve = (obj, path, functions, settings, referenceObject) => {
  const refObject = makeObject(referenceObject);
  const { settingsObject, arrayPath, priorPath } = initializeGetHandler(path, functions, settings);
  if (!doesPathIndicateComplexity(arrayPath)) {
    return returnResult(simpleGet(obj, arrayPath), path, refObject);
  }
  let tempObject = obj;
  arrayPath.every((element, index) => {
    const type = getTypeFromTempObject(tempObject);
    const { shouldItContinue, newTempObject } = getIteration(
      element, obj, tempObject, type, priorPath, arrayPath, index, functions,
      settingsObject, refObject,
    );
    tempObject = newTempObject;
    return shouldItContinue;
  });
  return returnResult(tempObject, priorPath, refObject);
};

module.exports = resolve;
