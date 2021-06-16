/**
 * Return what type of element is expected, number if tempObject
 * is an array, string otherwise
 * @param {Any} tempObject remaining tempObject
 * @returns {String} with value number or string
 */
const getTypeFromTempObject = (tempObject) => {
  if (Array.isArray(tempObject)) {
    return 'number';
  }
  return 'string';
};

module.exports = getTypeFromTempObject;
