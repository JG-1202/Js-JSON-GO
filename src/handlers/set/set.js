const Resolver = require('../resolver');
const pathTransformer = require('../../helpers/pathTransformer');
const doesPathIndicateComplexity = require('./src/doesPathIndicateComplexity');
const setSimplePath = require('./src/setSimplePath');

const setComplexPath = (obj, arrayPath, val, functions, settings, complexIndex) => {
  const complexPart = arrayPath.slice(0, complexIndex);
  const simplePart = arrayPath.slice(complexIndex);
  const resolver = new Resolver({ functions, settings: { ...settings, limit: 1 } });
  const resolved = resolver.resolve(obj, complexPart)[0];
  if (resolved && resolved.path) {
    setSimplePath(obj, [...resolved.path, ...simplePart], val);
  } else if (settings.fatalErrorOnCreate) {
    throw new Error('Path invalid. No results found for query.');
  }
};

/**
 * Sets single value on specified path
 * @param {object} obj - object
 * @param {any} path - string or array representation of path to set.
 * @param {any} val - value to be set at specified path.
 * @param {Object} functions - object of functions that can be called within query.
 * @param {Object} settings - object with settings.
 * @returns {object} object with newly set path in case that multiple logical checks
 * satisfy the first element will be set.
 */
const set = (obj, path, val, functions, settings) => {
  const arrayPath = pathTransformer(path, functions);
  const { isComplex, complexIndex } = doesPathIndicateComplexity(arrayPath);
  if (!isComplex) {
    setSimplePath(obj, arrayPath, val);
  } else {
    setComplexPath(obj, arrayPath, val, functions, settings, complexIndex);
  }
  return obj;
};

module.exports = set;
