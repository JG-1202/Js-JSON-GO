// const unlink = require('../basic/unlink.js');
const JsonGo = require('../../../index');
const pathTransformer = require('../../helpers/pathTransformer');
const stringify = require('../basic/stringify');
const getSinglePathElement = require('../../helpers/pathElements/getSingle');
const doesPathIndicateComplexity = require('./src/doesPathIndicateComplexity');
const simpleGet = require('./src/simpleGet');
const validateOutput = require('./src/validateOutput');
const getAllKeysFromObject = require('../../helpers/pathElements/getKeys/getAllKeysFromObject');
const getAllKeysFromArray = require('../../helpers/pathElements/getKeys/getAllKeysFromArray');

const getCache = {};

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

const getPathElement = (element, obj, tempObject, getType, priorPath, arrayPath, index) => {
  if (element.wildcard) {
    return getFirstKey(tempObject, arrayPath, getType, index, obj, priorPath);
  }
  return getSinglePathElement(element, obj, tempObject, getType, priorPath);
};

/**
 * Store result into cache so that it can be reused
 */
const setCache = (stringifiedPath, obj, tempObject) => {
  getCache[stringifiedPath] = { object: obj, result: tempObject };
};

/**
 * Validate if cache is for the right object
 */
const validateCache = (cache, obj) => cache && cache.object === obj;

/**
 * Retreives single value from objects specified path
 * @param {Object} obj - object/array from which value should be retreived.
 * @param {any} path - string or array representation of path to set.
 * @returns {any} returns value found at specified path, in case that multiple logical checks
 * satisfy the first element will be returned
 */
const get = (obj, path) => {
  const stringifiedPath = stringify(path);
  if (validateCache(getCache[stringifiedPath], obj)) {
    return getCache[stringifiedPath].result;
  }
  const arrayPath = pathTransformer(path);
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
  setCache(stringifiedPath, obj, tempObject);
  return tempObject;
};

module.exports = get;
