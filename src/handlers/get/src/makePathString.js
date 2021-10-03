/**
 * Add dot notated child
 */
const dotNotatedElementToAdd = (toReturn, toAdd) => {
  if (toReturn) {
    return `.${toAdd}`;
  }
  return toAdd;
};

/**
 * Make sure that returned path is a string, if it is an array with 'number' and/or 'string'
 * elements, convert it to a path as string
 * @param {Any} inputPath Path either as string or as an array of elements with 'number' or 'string'
 * properties
 * @returns path as string
 */
const makePathString = (inputPath) => {
  if (Array.isArray(inputPath)) {
    let toReturn = '';
    inputPath.forEach((element) => {
      if (element.number !== undefined) {
        toReturn += `[${element.number}]`;
      } else if (!Number.isNaN(Number(element.string))) {
        toReturn += `["${element.string}"]`;
      } else {
        toReturn += dotNotatedElementToAdd(toReturn, element.string);
      }
    });
    return toReturn;
  }
  return inputPath;
};

module.exports = makePathString;
