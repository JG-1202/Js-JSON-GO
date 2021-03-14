/**
 * Validate results, returns true if valid, false otherwise
*/
const areResultsInvalid = (results) => (!results || results.length === 0);

/**
 * Validate results and throw error on fatalError porperty
 * @param {Boolean} fatalError - true if fatal error should be thrown in case results are invalid
 * @param {Array} results - array of results
 * @returns {Error} if no results are provided or length of results is 0, and fatalError is true
 */
const checkForError = (fatalError, results) => {
  if (fatalError && areResultsInvalid(results)) {
    throw new Error('No element is found for provided wildcard.');
  }
};

module.exports = checkForError;
