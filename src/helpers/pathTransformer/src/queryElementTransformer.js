const createRegExpFromString = require('./queryElementTransformHelpers/createRegexpFromString');
const addFunctionToQuery = require('./queryElementTransformHelpers/addFunctionToQuery');

const specials = ['null', 'undefined', 'true', 'false'];

// eslint-disable-next-line complexity
const handleSpecials = (element) => {
  switch (element) {
    case 'null':
      return null;
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return undefined;
  }
};
/**
 * Logical check on whether input is a number
 */
const isNumberNumber = (element) => !Number.isNaN(Number(element));

/**
 * Removes first and last character from string
 */
const removeOpeningClosingChars = (element) => element.substr(1, element.length - 2);

/**
 * Logical check on whether input is enclosed in single/double brackets
 */
const isStringString = (element) => {
  const firstChar = element.charAt(0);
  const lastChar = element.charAt(element.length - 1);
  return (firstChar === lastChar && (firstChar === '"' || firstChar === "'"));
};

/**
 * Logical check on whether string starts with a dollar sign
 */
const checkIfFirstCharIsDollarSign = (queryElement) => (queryElement && typeof queryElement === 'string' && queryElement.charAt(0) === '$');

/**
 * Logical check on whether string starts with $JSON
 */
const checkIfJSON = (queryElement) => (queryElement && typeof queryElement === 'string' && queryElement.substring(0, 6) === '$JSON(');

/**
 * Logical check on whether string starts with $Function
 */
const checkIfFunction = (queryElement) => (queryElement && typeof queryElement === 'string' && queryElement.substring(0, 10) === '$Function(');

/**
 * Logical check on whether string starts with $RegExp
 */
const checkIfRegExp = (queryElement) => (queryElement && typeof queryElement === 'string' && queryElement.substring(0, 8) === '$RegExp(');

/**
 * Logical check on whether string starts with a dot
 */
const checkIfFirstCharIsDot = (queryElement) => (queryElement && typeof queryElement === 'string' && queryElement.charAt(0) === '.');

/**
 * Logical check on whether input indicates a custom query (end or append)
 */
const isCustomQuery = (queryElement) => (queryElement && ['end', 'append'].indexOf(queryElement) > -1);

/**
 * Removes first character from string
 */
const removeFirstChar = (queryElement) => queryElement.substr(1);

/**
 * Throws error on falsy element
 */
const validateElement = (element) => {
  if (!element) {
    throw new Error('Query element is invalid.');
  }
};

/**
 * Determines the relative depth of relative path (minus one for each dot)
 */
const determineRelativeDepth = (element) => {
  let thisElement = element;
  let relativeDepth = 0;
  while (checkIfFirstCharIsDot(thisElement)) {
    relativeDepth += -1;
    thisElement = removeFirstChar(thisElement);
  }
  return { thisElement, relativeDepth };
};

/**
 * Removes indicators that element is JSON and returns parsed JSON into value key
 */
const handleJson = (element) => {
  const remainingElement = element.substr(6, element.length - 7);
  return { value: JSON.parse(remainingElement) };
};

/**
 * Removes indicators that element is Function and returns the function itself
 */
const handleFunctions = (element, funcs) => {
  const remainingElement = element.substr(10, element.length - 11);
  return { value: { function: addFunctionToQuery(remainingElement, funcs) } };
};

/**
 * Removes indicators that element is RegExp and returns a new RegExp
 */
const handleRegExp = (element) => {
  const remainingElement = element.substr(8, element.length - 9);
  return { value: { regex: createRegExpFromString(remainingElement) } };
};

/**
 * Determines whether string indicates an absolute or relative path, returns object
 * with keyName the type of path (absolute, or relative) and keyValue the value of element
 */
const handlePaths = (element) => {
  let thisElement = element;
  thisElement = thisElement.substr(1);
  if (isCustomQuery(thisElement)) {
    return { custom: thisElement };
  }
  if (checkIfFirstCharIsDot(thisElement)) {
    thisElement = removeFirstChar(thisElement);
    const checkedRelativeDepth = determineRelativeDepth(thisElement);
    const { relativeDepth } = checkedRelativeDepth;
    thisElement = checkedRelativeDepth.thisElement;
    validateElement(thisElement);
    return { relativePath: thisElement, relativeDepth };
  }
  validateElement(thisElement);
  return { absolutePath: thisElement };
};

/**
 * Transforms each element of query into workable object representation
 * @param {String} element - string representation of query element
 * @param {Object} funcs - object with functions provided by the user that may be part of the query
 * @returns {Object} - object with keyName the type of element and keyValue the value of element
 */
// eslint-disable-next-line complexity
const queryElementTransformer = (element, funcs) => {
  validateElement(element);
  if (specials.indexOf(element) > -1) {
    return { value: handleSpecials(element) };
  }
  if (element && isStringString(element) && typeof element === 'string') {
    return { value: removeOpeningClosingChars(element) };
  }
  if (isNumberNumber(element)) {
    return { value: Number(element) };
  }
  if (checkIfFirstCharIsDollarSign(element)) {
    if (checkIfJSON(element)) {
      return handleJson(element);
    }
    if (checkIfRegExp(element)) {
      return handleRegExp(element);
    }
    if (checkIfFunction(element)) {
      return handleFunctions(element, funcs);
    }
    return handlePaths(element);
  }
  return { value: element };
};

module.exports = queryElementTransformer;
