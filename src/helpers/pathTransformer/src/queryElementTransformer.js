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
 * Logical check on whether string starts with a dollar sign
 */
const checkIfJSON = (queryElement) => (queryElement && typeof queryElement === 'string' && queryElement.substring(0, 6) === '$JSON(');

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
 * @returns {Object} - object with keyName the type of element and keyValue the value of element
 */
// eslint-disable-next-line complexity
const queryElementTransformer = (element) => {
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
    return handlePaths(element);
  }
  return { value: element };
};

module.exports = queryElementTransformer;
