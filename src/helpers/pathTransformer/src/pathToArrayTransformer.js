const queriesCache = {};
const unlink = require('../../../handlers/basic/unlink.js');
const elementTransformer = require('./elementTransformer.js');

/**
 * Updates counter on opening bracket, if counter is 0 push to path representation
 */
const handleOpeningBracket = (char, actionVariables) => {
  let { counter } = actionVariables;
  let { part } = actionVariables;
  const { arrayPath } = actionVariables;

  if (counter === 0) {
    if (part) {
      arrayPath.push(elementTransformer(part, arrayPath));
      part = '';
    }
  } else {
    part += char;
  }
  counter += 1;
  return { counter, part, arrayPath };
};

/**
 * Handling dot separator, if counter is 0, push to path representation
 */
const handleDot = (char, actionVariables) => {
  const { counter } = actionVariables;
  let { part } = actionVariables;
  const { arrayPath } = actionVariables;

  if (counter === 0) {
    if (part) {
      arrayPath.push(elementTransformer(actionVariables.part, arrayPath));
      part = '';
    }
  } else {
    part += char;
  }
  return { counter, part, arrayPath };
};

/**
 * Updates counter on closing bracket, if counter is 0 push to path representation
 */
const handleClosingBracket = (char, actionVariables) => {
  let { counter } = actionVariables;
  let { part } = actionVariables;
  const { arrayPath } = actionVariables;
  counter += -1;
  if (counter === 0) {
    if (part) {
      arrayPath.push(elementTransformer(part, arrayPath));
      part = '';
    }
  } else {
    part += char;
  }
  return { counter, part, arrayPath };
};

/**
 * Handling path separators [, ], .
 */
const handleSeperators = (char, actionVariables) => {
  if (char === '[') {
    return handleOpeningBracket(char, actionVariables);
  }
  if (char === ']') {
    return handleClosingBracket(char, actionVariables);
  }
  return handleDot(char, actionVariables);
};

/**
 * Handle each character and returns array with one element per key of path
 */
const charactersToArray = (characters) => {
  let actionVariables = {
    arrayPath: [],
    part: '',
    counter: 0,
  };
  characters.forEach((char) => {
    if (['[', ']', '.'].indexOf(char) > -1) {
      actionVariables = handleSeperators(char, actionVariables);
    } else {
      actionVariables.part += char;
    }
  });
  if (actionVariables.part) {
    actionVariables.arrayPath.push(elementTransformer(
      actionVariables.part, actionVariables.arrayPath,
    ));
  }
  return actionVariables.arrayPath;
};

/**
 * Transforms string representation of path into workable array representation
 * @param {String} query - string representation of path
 * @returns {Array} - workable array representation of path
 */
const pathToArrayTransformer = (path) => {
  if (queriesCache[path]) {
    return unlink(queriesCache[path]);
  }
  const characters = path.split('');
  const arrayPath = charactersToArray(characters);
  queriesCache[path] = unlink(arrayPath);
  return arrayPath;
};

module.exports = pathToArrayTransformer;
