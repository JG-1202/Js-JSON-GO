/**
 * default function always returns false
 */
const defaultFunction = () => false;

/**
 * Search for function within funcs object and return matchin name
 * @param {String} element - string representation of regex
 * @param {Object} funcs - object with functions provided by the user that may be part of the query
 * @returns {Functino} - Function with matchin name from funcs function
 */
const addFunctionToQuery = (element, funcs) => {
  if (funcs[element] && typeof funcs[element] === 'function') {
    return funcs[element];
  }
  return defaultFunction;
};

module.exports = addFunctionToQuery;
