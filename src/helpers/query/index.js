const JsonGo = require('../../../index.js');
const logicalValidator = require('./src/logicalValidator.js');
const getAbsolutePath = require('./src/getAbsolutePath');

/**
 * returns value from provided path
 */
const getValueFromTransformedQuery = (
  element, object, currentElement, priorPath, functions, settings,
) => {
  if (element && element.relativePath) {
    const result = JsonGo.get(object, [
      ...priorPath, currentElement, ...element.relativePath,
    ], functions, settings);
    return result;
  }
  return JsonGo.get(object, element.path);
};

/**
 * checks if either absolutePath or relativePath is present
 */
const doesElementHaveAbsoluteOrRelativePath = (element) => {
  if (element) {
    return (element.absolutePath || element.relativePath);
  }
  return false;
};

/**
 * checks whether value key is present
 */
const doesElementHaveValue = (element) => (element && element.value !== undefined);

/**
 * get value for each of the query elements, either from provided value key or from objects
 * specified path
 */
const getValue = (element, object, currentElement, priorPath, functions, settings) => {
  if (doesElementHaveValue(element)) {
    return element.value;
  }
  if (doesElementHaveAbsoluteOrRelativePath(element)) {
    const transformedPath = getAbsolutePath(priorPath, element, functions);
    return getValueFromTransformedQuery(
      transformedPath, object, currentElement, priorPath, functions, settings,
    );
  }
  return undefined;
};

/**
 * check if operation is to get end of array
 */
const isOperationToGetEnd = (query) => query[0] && query[0].custom === 'end';

/**
 * check if operation is to append to array
 */
const isOperationToAppend = (query) => query[0] && query[0].custom === 'append';

/**
 * checks each element of object/array whether it matches query
 */
const checkLogic = (
  firstPart, operator, secondPart, results, continueAfterFirstMatch, i, type, element,
) => {
  let newResults = results;
  let nextIterationDesired = true;
  if (logicalValidator(firstPart, operator, secondPart, element)) {
    const toReturn = {};
    toReturn[type] = i;
    if (!continueAfterFirstMatch) {
      newResults = toReturn;
      nextIterationDesired = false;
    } else {
      newResults.push(toReturn);
    }
  }
  return { newResults, nextIterationDesired };
};

/**
 * custom query end
 */
const getEndOfArray = (tempObject, continueAfterFirstMatch) => {
  const arrayEnd = tempObject.length - 1;
  if (arrayEnd >= 0) {
    if (!continueAfterFirstMatch) {
      return { number: tempObject.length - 1 };
    }
    return [{ number: tempObject.length - 1 }];
  }
  return [];
};

/**
 * custom query append
 */
const getElementToAppend = (tempObject, continueAfterFirstMatch) => {
  if (!continueAfterFirstMatch) {
    return { number: tempObject.length };
  }
  return [{ number: tempObject.length }];
};

/**
 * performs query for arrays
 */
const handleArray = (
  query, object, tempObject, continueAfterFirstMatch, priorPath, functions, settings,
) => {
  let results = [];
  if (isOperationToGetEnd(query)) {
    return getEndOfArray(tempObject, continueAfterFirstMatch);
  }
  if (isOperationToAppend(query)) {
    return getElementToAppend(tempObject, continueAfterFirstMatch);
  }

  tempObject.every((element, i) => {
    const firstPart = getValue(query[0], object, { number: i }, priorPath, functions, settings);
    const operator = getValue(query[1], object, { number: i }, priorPath);
    const secondPart = getValue(query[2], object, { number: i }, priorPath, functions, settings);
    const { newResults, nextIterationDesired } = checkLogic(
      firstPart, operator, secondPart, results, continueAfterFirstMatch, i, 'number', element,
    );
    results = newResults;
    return nextIterationDesired;
  });
  return results;
};

/**
 * performs query for objects
 */
const handleObject = (
  query, object, tempObject, continueAfterFirstMatch, priorPath, functions, settings,
) => {
  let results = [];
  Object.keys(tempObject).every((element) => {
    const firstPart = getValue(
      query[0], object, { string: element }, priorPath, functions, settings,
    );
    const operator = getValue(query[1], object, { string: element }, priorPath);
    const secondPart = getValue(
      query[2], object, { string: element }, priorPath, functions, settings,
    );
    const { newResults, nextIterationDesired } = checkLogic(
      firstPart, operator, secondPart, results, continueAfterFirstMatch, element, 'string',
    );
    results = newResults;
    return nextIterationDesired;
  });
  return results;
};

/**
 * Query input object and return element(s) that suffice query statement
 * @param {Array} q - array representation of query with lenght of 1 or 3
 * @param {Any} obj - entire object/array that is queried
 * @param {Any} tempObject - remaining (deeper) part of object/array
 * @param {Boolean} continueAfterFirstMatch - indicator whether multiple outputs are desired
 * @param {Array} priorPath - array representation of current path
 * (relates to prior path where to find tempObject)
 * @param {Object} functions - object with functions.
 * @param {Object} settings - object with settings.
 * @returns {Any} - either object with first element that matches query requirement,
 * or an array of these objects in case of continueAfterFirstMatch
 */
const query = (q, obj, tempObject, continueAfterFirstMatch, priorPath, functions, settings) => {
  if (Array.isArray(tempObject)) {
    return handleArray(q, obj, tempObject, continueAfterFirstMatch, priorPath, functions, settings);
  }
  return handleObject(q, obj, tempObject, continueAfterFirstMatch, priorPath, functions, settings);
};

module.exports = query;
