/**
 * check whether element is a query
 */
const isOperationQuery = (element) => (element && element.query && element.query[0]);

/**
  * check whether element is custom query append
  */
const isOperationToAppend = (element) => (isOperationQuery(element) && element.query[0].custom === 'append');

/**
  * check whether element contains number key
  */
const isElementNumber = (element) => (element && element.number !== undefined);

/**
  * check whether nextElement indicates that current element should be an array
  */
const doesNextElementIndicateArray = (nextElement) => {
  if (isElementNumber(nextElement)) {
    return true;
  }
  if (isOperationToAppend(nextElement)) {
    return true;
  }
  return false;
};

/**
  * return empty array or object depending on nextElement
  */
const setNonExistingElement = (nextElement) => {
  if (nextElement && doesNextElementIndicateArray(nextElement)) {
    return [];
  }
  return {};
};

const getElement = (element, object) => {
  if (element.number !== undefined) {
    return Number(element.number);
  }
  if (element.string !== undefined) {
    return String(element.string);
  }
  if (isOperationToAppend(element)) {
    return object.length;
  }
  return element;
};

/**
  * Set tempObject to deeper level, create if non-existent
  * @param {Object} element - input element with number, string or query key
  * @param {Object} object - tempObject containing the element at current location (from path)
  * @param {Object} nextElement - element of next iteration
  * @param {Boolean} isFinalElement - boolean to indicate whether it is the last element of path
  * @param {Any} val - value to be set at path
  * @returns {Object} tempObject with new element
  */
const setElement = (element, object, nextElement, isFinalElement, val) => {
  let temp = object;
  const el = getElement(element, object);
  if (temp[el] === undefined) {
    temp[el] = setNonExistingElement(nextElement);
  }
  if (isFinalElement) {
    temp[el] = val;
  } else {
    temp = temp[el];
  }
  return temp;
};

module.exports = setElement;
