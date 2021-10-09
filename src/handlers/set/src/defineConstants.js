const backwardCompatibility = require('./backwardCompatibility');
const returnObject = require('../../../helpers/returnObject');
const pathTransformer = require('../../../helpers/pathTransformer');

/**
 * Define basic constants needed on set and setAll
 * @param {String} path
 * @param {Object} functions
 * @param {Object} settings
 * @returns {Object} with settingsObject, arrayPath, priorPath, and functionsObject
 */
const defineConstants = (path, functions, settings) => {
  const backwardCompatibilityObject = backwardCompatibility(functions, settings);
  const { functionsObject } = backwardCompatibilityObject;
  const settingsObject = returnObject(backwardCompatibilityObject.settingsObject);
  const arrayPath = pathTransformer(path, functionsObject);
  const priorPath = [];
  return {
    settingsObject, arrayPath, priorPath, functionsObject,
  };
};

module.exports = defineConstants;
