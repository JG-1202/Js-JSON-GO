const chopObject = (toChop, chopSize) => {
  const result = [];
  for (let i = 0; i < Object.entries(toChop).length; i += chopSize) {
    const objectEntries = Object.entries(toChop).slice(i, i + chopSize);
    result.push(objectEntries.reduce((accumulativeObject, [key, value]) => {
      const object = accumulativeObject;
      object[key] = value;
      return object;
    }, {}));
  }
  return result;
};

module.exports = chopObject;
