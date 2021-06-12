/**
 * default function always returns false
 */
const defaultFunction = () => false;

/**
 * match function from funcs object
 */
const addFunctionToQuery = (element, funcs) => {
  if (funcs[element] && typeof funcs[element] === 'function') {
    return funcs[element];
  }
  return defaultFunction;
};

/**
 * Removes indicators that element is Function and returns the function itself
 * @param {String} element - string representation of regex
 * @param {Object} funcs - object with functions provided by the user that may be part of the query
 * @returns {Function} - Function with matching name from funcs object
 */
const handleFunctions = (element, funcs) => {
  const remainingElement = element.substr(10, element.length - 11);
  return { value: { function: addFunctionToQuery(remainingElement, funcs) } };
};

module.exports = handleFunctions;
