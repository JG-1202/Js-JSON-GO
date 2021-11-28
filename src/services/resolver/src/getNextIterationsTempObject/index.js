const getNextIterationsTempObject = ({ elementValues, tempObj, type }) => {
  if (elementValues.length === 1) {
    const toReturn = tempObj[elementValues[0][type]];
    return toReturn;
  }
  return undefined;
};

module.exports = getNextIterationsTempObject;
