/**
 * Removes indicators that element is JSON and returns parsed JSON into value key
 * @param {String} element - element to get JSON from
 * @return {Object} object with parsed JSON in value key
 */
const handleJson = (element) => {
  const remainingElement = element.substr(6, element.length - 7);
  return { value: JSON.parse(remainingElement) };
};

module.exports = handleJson;
