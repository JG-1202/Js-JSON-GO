const query = require('../../query');

/**
 * Validate results, throw error if no results are found and fatalError is true
 */
const validateResults = (results, settings, element) => {
  if (results.length === 0 && settings.fatalErrorOnCreate) {
    throw new Error(`No results found for provided query ${JSON.stringify(element.query)}.`);
  }
};

/**
 * Get path elements of the provided getType, if a query is found perform query and
 * return all results that match
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
 * @returns {Array} - elements of provided getType, or empty array if not found
 */
const getMultiplePathElements = (
  element, obj, tempObject, getType, priorPath, functions, settings,
) => {
  const results = [];
  if (element[getType] !== undefined) {
    results.push(element);
  } else if (element.query) {
    const queryResult = query(element.query, obj, tempObject, true, priorPath, functions, settings);
    queryResult.forEach((result) => {
      if (result[getType] !== undefined) {
        results.push(result);
      }
    });
    validateResults(results, settings, element);
  }
  return results;
};

module.exports = getMultiplePathElements;
