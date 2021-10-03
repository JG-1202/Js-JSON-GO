/**
 * Throws error on falsy element
 * @param {Any} element element to validate
 */
const validateElement = (element) => {
  if (!element || typeof element !== 'string') {
    throw new Error('Query element is invalid.');
  }
};

module.exports = validateElement;
