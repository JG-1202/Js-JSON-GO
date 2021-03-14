const pathTransformer = require('../../pathTransformer');

/**
 * Get index of relativeDepth and check whether it is valid
 * (non-existing index <0 is considered invalid)
 */
const getRelativeIndex = (index, relativeDepth) => {
  if (index + relativeDepth >= 0 && relativeDepth <= 0) {
    return index + relativeDepth;
  }
  throw new Error(`Relative depth (${index}+${relativeDepth}) of query is invalid.`);
};

/**
 * Create element with relativePath and relativeOrigin
 */
const setNewElementFromRelativePath = (priorPath, element) => {
  let newElement = element;
  if (newElement.relativeDepth === 0) {
    newElement = {
      relativePath: pathTransformer(newElement.relativePath),
      relativeOrigin: priorPath,
    };
  } else {
    const relativeIndex = getRelativeIndex(
      priorPath.length, newElement.relativeDepth,
    );
    newElement = {
      path: [...priorPath.slice(0, relativeIndex), ...pathTransformer(newElement.relativePath)],
    };
  }
  return newElement;
};

/**
 * Retreive full path from priorPath and provided element (following path)
 * @param {Array} priorPath - priorPath up to origin of tempObject
 * @param {Object} element - element containing absolute or relative
 * (starting from origin of tempObject) path
 * @returns {Array} - full path from origin of object
 */
const getAbsolutePath = (priorPath, element) => {
  let newElement = element;
  if (newElement.absolutePath) {
    newElement = {
      path: pathTransformer(newElement.absolutePath),
    };
  } else if (newElement.relativePath) {
    newElement = setNewElementFromRelativePath(priorPath, element);
  }
  return newElement;
};

module.exports = getAbsolutePath;
