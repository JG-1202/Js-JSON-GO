const pathTransformer = require('../../../helpers/pathTransformer');
const returnObject = require('../../../helpers/returnObject');

/**
 * Initialize get handling
 * @param {any} path - string or array representation of path to set.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns initial settingsObject, arrayPath, and priorPath
 */
const initializeGetHandler = (path, functions, settings) => {
  const settingsObject = returnObject(settings);
  const arrayPath = pathTransformer(path, functions);
  const priorPath = [];
  return { settingsObject, arrayPath, priorPath };
};

module.exports = initializeGetHandler;
