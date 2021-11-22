const makeArray = require('../../../make/makeArray');
const validateOutput = require('../validateOutput');
const updateReferences = require('../updateReferences');

const simpleResolve = ({ arrayPath, obj, refObject }) => {
  let tempObject = obj;
  arrayPath.every((element, index) => {
    let elementValue = element.string;
    if (Array.isArray(tempObject)) {
      elementValue = element.number;
    }
    tempObject = tempObject[elementValue];
    const {
      shouldItContinue, newTempObject,
    } = validateOutput(tempObject, arrayPath.length - 1 === index);
    tempObject = newTempObject;
    updateReferences({
      currentReference: element.reference,
      resolvedElement: element,
      refObject,
    });
    return shouldItContinue;
  });
  if (tempObject !== undefined) {
    return makeArray([{ value: tempObject, path: arrayPath, references: { ...refObject } }]);
  }
  return makeArray();
};

module.exports = simpleResolve;
