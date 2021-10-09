/**
 * Function to facilitate backward compatibility until v1.0.0 if fatalError setting as a boolean
 * is provided.
 * @param {Any} inputA
 * @param {Any} inputB
 * @returns functions and settings object
 */
const backwardCompatibility = (inputA, inputB) => {
  if (typeof inputA === 'boolean') {
    console.warn('Deprecation warning: The use of fatalError on set/setAll is deprecated and will be removed from version 1.0.0 onwards. Use settings object instead.');
    return {
      functionsObject: inputB,
      settingsObject: {
        fatalErrorOnCreate: inputA,
      },
    };
  }
  return {
    functionsObject: inputA,
    settingsObject: inputB,
  };
};

module.exports = backwardCompatibility;
