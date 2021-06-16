/**
 * Check whether there is already a result and whether element is equal to check value
 */
const isRelevant = (element, result, check) => (result === undefined && element === check);

/**
 * return updated result for check value case return toReturn if element equals check
 */
const handleSpecificSpecial = (element, result, check, toReturn) => {
  if (isRelevant(element, result, check)) {
    return toReturn;
  }
  return result;
};

/**
 * Handle special values null, true, false and undefined
 * @param {String} element element to get special from
 * @returns unstringified null, true, false, or undefined
 */
const handleSpecials = (element) => {
  let result;
  result = handleSpecificSpecial(element, result, 'null', null);
  result = handleSpecificSpecial(element, result, 'true', true);
  result = handleSpecificSpecial(element, result, 'false', false);
  result = handleSpecificSpecial(element, result, 'undefined', undefined);
  return result;
};

module.exports = handleSpecials;
