const resolve = require('../../resolve/resolve');

/**
 * Push each element to tempObject on key _{typeof resolvedElement}_{resolvedElement}
 */
const fillTempObj = (object, groupBasedOn, tempObj, element) => {
  const temporaryObject = tempObj;
  let keyName = '';
  groupBasedOn.forEach((groupElement) => {
    const resolvedElement = resolve(object, groupElement).value;
    keyName += `_${typeof resolvedElement}_${resolvedElement}`;
  });
  if (!tempObj[keyName]) {
    temporaryObject[keyName] = [];
  }
  tempObj[keyName].push(element);
};

/**
 * Group objects/arrays by their values on the specified groupedBy path(s)
 * @param {Object} object
 * @param {String/Array} groupedBy path(s) to group by
 * @returns {Array} grouped by groupedBy resolved paths
 */
const groupBy = (object, groupedBy) => {
  const groupBasedOn = Array.isArray(groupedBy) ? groupedBy : [groupedBy];
  const tempObj = {};
  const toReturn = [];
  if (Array.isArray(object)) {
    object.forEach((element) => fillTempObj(object, groupBasedOn, tempObj, element));
  } else {
    Object.keys(object).forEach((key) => {
      const element = object[key];
      fillTempObj(object, groupBasedOn, tempObj, element);
    });
  }
  Object.keys(tempObj).forEach((key) => toReturn.push(tempObj[key]));
  return toReturn;
};

module.exports = groupBy;
