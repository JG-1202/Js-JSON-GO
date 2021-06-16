const validateElement = require('../../validateElement');

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
 * Determines whether string indicates an absolute or relative path
 * @param {String} element element to retreive path from
 * @returns {Object} object with keyName the type of path
 * (absolute, or relative) and keyValue the value of element
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

module.exports = handlePaths;
