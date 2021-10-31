const query = require('../../query');

/**
 * Return result of provided getType, throw error if no results are found and fatalError is true
 */
const checkQueryResult = (queryResult, getType, element, settings) => {
  if (queryResult[getType] !== undefined) {
    return queryResult[getType];
  }
  if (settings.fatalErrorOnCreate) {
    throw new Error(`No results found for provided query ${JSON.stringify(element.query)}.`);
  }
  return undefined;
};

/**
 * Get path element of the provided getType, if a query is found perform query and return result
 * @param {Object} element - input element with number, string or query key
 * @param {Object} obj - initial object
 * @param {Object} tempObject - remainder of initial object found at priorPath
 * @param {String} getType - getType is either 'string' or 'number'
 * @param {Array} priorPath - array representation of already processed path
 * (path at current iteration)
 * @param {Boolean} fatalError - boolean indicating if fatalError should be thrown
 * if no match is found for query
 * @param {Object} functions - object with functions.
 * @param {Object} settings - object with settings.
 * @param {Object} refObject - object with (resolved) references.
 * @returns {Any} - element of provided getType, or undefined if not found
 */
const getSinglePathElement = (
  element, obj, tempObject, getType, priorPath, functions, settings, refObject,
) => {
  if (element[getType] !== undefined) {
    return element[getType];
  }
  if (element.query) {
    const queryResult = query(
      element.query, obj, tempObject, false, priorPath, functions, settings, refObject,
    );
    return checkQueryResult(queryResult, getType, element, settings);
  }
  return undefined;
};

module.exports = getSinglePathElement;
