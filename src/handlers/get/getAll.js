const JG = require('../../../index.js');

const getMultiplePathElements = require('../../helpers/pathElements/getMultiple');
const doesPathIndicateComplexity = require('./src/doesPathIndicateComplexity');
const simpleGet = require('./src/simpleGet');
const validateOutput = require('./src/validateOutput');
const getAllKeysFromObject = require('../../helpers/pathElements/getKeys/getAllKeysFromObject');
const getAllKeysFromArray = require('../../helpers/pathElements/getKeys/getAllKeysFromArray');
const getTypeFromTempObject = require('./src/getTypeFromTempObject');
const initializeGetHandler = require('./src/initializeGetHandler');

/**
 * Get names of elements either from wildcard or from other type of elements
 */
const getPathElements = (element, obj, tempObject, getType, priorPath, functions, settings) => {
  if (element.wildcard) {
    if (getType === 'number') {
      return getAllKeysFromArray(tempObject, settings);
    }
    return getAllKeysFromObject(tempObject, settings);
  }
  return getMultiplePathElements(element, obj, tempObject, getType, priorPath, functions, settings);
};

/**
 * If there is only one result, update tempObject
 */
const setTempObjectNewIteration = (elementValues, tempObject, getType) => {
  if (elementValues.length === 1) {
    const toReturn = tempObject[elementValues[0][getType]];
    return toReturn;
  }
  return undefined;
};

/**
 * If there is a remaining tempObject, add it to results.
 */
const addFinalTempToResults = (results, tempObject) => {
  if (tempObject !== undefined) {
    results.push(tempObject);
  }
  return results;
};

/**
 * Get all results that need to be retreived with getAll
 */
const addMultipleResults = (
  arrayPath, index, elementValues, remainingPath, obj, results, functions, settings,
) => {
  let newResults = results;
  const previousPath = arrayPath.slice(0, index);
  elementValues.forEach((elementValue) => {
    const checkPath = [
      ...previousPath, elementValue, ...remainingPath,
    ];
    const r = JG.getAll(obj, checkPath, functions, settings);
    newResults = [...newResults, ...r];
  });
  return newResults;
};

/**
 * Get all results that can be retreived with get function
 */
const addSingleResults = (elementValues, tempObject, remainingPath, newResults, settings) => {
  elementValues.forEach((elementValue) => {
    const singleResult = simpleGet(tempObject, [elementValue, ...remainingPath], settings);
    if (singleResult !== undefined) {
      newResults.push(singleResult);
    }
  });
};

/**
 * When multiple elementValues are found, attempt to get them all and store in results
 */
const addToResults = (
  results, elementValues, index, obj, arrayPath, tempObject, functions, settings,
) => {
  let newResults = results;
  if (elementValues.length > 1) {
    const remainingPath = arrayPath.slice(index + 1);
    if (doesPathIndicateComplexity(remainingPath)) {
      newResults = addMultipleResults(
        arrayPath, index, elementValues, remainingPath, obj, newResults, functions, settings,
      );
    } else {
      addSingleResults(elementValues, tempObject, remainingPath, newResults, settings);
    }
  }
  return newResults;
};

/**
 * Update arrayPath with resolved element
 */
const setArrayPathIndex = (elementValues, currentPath) => {
  if (elementValues.length === 1 && typeof elementValues[0] === 'object') {
    return elementValues[0];
  }
  return currentPath;
};

/**
 * Returns an array with element, or empty array if element is undefined
 */
const returnArray = (element) => {
  if (element !== undefined) {
    return [element];
  }
  return [];
};

/**
 * For each element of the array path, get its element and return whether a next
 * iterations is desired
 */
const getAllIteration = (
  element, obj, tempObject, type, priorPath, functions, settingsObject, results, index, arrayPath,
) => {
  let tempResults = results;
  let tempObj = tempObject;
  const arrPath = arrayPath;
  const elementValues = getPathElements(
    element, obj, tempObject, type, priorPath, functions, settingsObject,
  );
  tempResults = addToResults(
    results, elementValues, index, obj, arrayPath, tempObject, functions, settingsObject,
  );
  tempObj = setTempObjectNewIteration(elementValues, tempObj, type);
  arrPath[index] = setArrayPathIndex(elementValues, arrPath[index]);
  priorPath.push(arrPath[index]);
  return { tempResults, ...validateOutput(tempObj, arrPath.length - 1 === index) };
};

/**
 * Retreives all values from objects specified path
 * @param {Object} obj - object/array from which value should be retreived.
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {Array} returns array of values that match the specified path with logical checks
 */
const getAll = (obj, path, functions, settings) => {
  const { settingsObject, arrayPath, priorPath } = initializeGetHandler(path, functions, settings);
  if (!doesPathIndicateComplexity(arrayPath)) {
    return returnArray(simpleGet(obj, arrayPath));
  }
  let results = [];
  let tempObject = obj;
  arrayPath.every((element, i) => {
    const type = getTypeFromTempObject(tempObject);
    const { shouldItContinue, newTempObject, tempResults } = getAllIteration(
      element, obj, tempObject, type, priorPath, functions, settingsObject, results, i, arrayPath,
    );
    results = tempResults;
    tempObject = newTempObject;
    return shouldItContinue;
  });
  results = addFinalTempToResults(results, tempObject);
  return results;
};

module.exports = getAll;
