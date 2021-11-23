/**
 * custom query end
 */
const getEndOfArray = (tempObject) => {
  const arrayEnd = tempObject.length - 1;
  if (arrayEnd >= 0) {
    return [{ number: tempObject.length - 1 }];
  }
  return [];
};

module.exports = getEndOfArray;
