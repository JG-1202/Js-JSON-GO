const validateOutput = (tempObject, isLastIteration) => {
  if (tempObject && typeof tempObject === 'object') {
    return { shouldItContinue: true, newTempObject: tempObject };
  }
  if (!isLastIteration) {
    return { shouldItContinue: false, newTempObject: undefined };
  }
  return { shouldItContinue: false, newTempObject: tempObject };
};

module.exports = validateOutput;
