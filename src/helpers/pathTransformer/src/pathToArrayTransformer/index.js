const elementTransformer = require('../elementTransformer');

/**
 * Check counter, if counter is at 0 push part into path array, otherwise add character
 * to part
 */
const checkCounter = (char, actionVariables, funcs) => {
  const newActionVariables = actionVariables;
  if (newActionVariables.counter === 0) {
    if (newActionVariables.part) {
      newActionVariables.arrayPath.push(elementTransformer(newActionVariables.part, funcs));
      newActionVariables.part = '';
    }
  } else {
    newActionVariables.part += char;
  }
  return newActionVariables;
};

/**
 * Updates counter on opening bracket, if counter is 0 push to path representation
 */
const handleOpeningBracket = (char, actionVariables, funcs) => {
  const newActionVariables = checkCounter(char, actionVariables, funcs);
  newActionVariables.counter += 1;
  return newActionVariables;
};

/**
 * Handling dot separator, if counter is 0, push to path representation
 */
const handleDot = (char, actionVariables, funcs) => checkCounter(char, actionVariables, funcs);

/**
 * Updates counter on closing bracket, if counter is 0 push to path representation
 */
const handleClosingBracket = (char, actionVariables, funcs) => {
  const newActionVariables = actionVariables;
  newActionVariables.counter += -1;
  return checkCounter(char, actionVariables, funcs);
};

/**
 * Handling path separators [, ], .
 */
const handleSeperators = (char, actionVariables, funcs) => {
  if (char === '[') {
    return handleOpeningBracket(char, actionVariables, funcs);
  }
  if (char === ']') {
    return handleClosingBracket(char, actionVariables, funcs);
  }
  return handleDot(char, actionVariables, funcs);
};

/**
 * Handle each character and returns array with one element per key of path
 */
const charactersToArray = (characters, funcs) => {
  let actionVariables = {
    arrayPath: [],
    part: '',
    counter: 0,
  };
  characters.forEach((char) => {
    if (['[', ']', '.'].indexOf(char) > -1) {
      actionVariables = handleSeperators(char, actionVariables, funcs);
    } else {
      actionVariables.part += char;
    }
  });
  if (actionVariables.part) {
    actionVariables.arrayPath.push(elementTransformer(
      actionVariables.part, funcs,
    ));
  }
  return actionVariables.arrayPath;
};

/**
 * Transforms string representation of path into workable array representation
 * @param {String} query - string representation of path
 * @param {Object} funcs - object with functions provided by the user that may be part of the query
 * @returns {Array} - workable array representation of path
 */
const pathToArrayTransformer = (path, funcs) => {
  const characters = path.split('');
  const arrayPath = charactersToArray(characters, funcs);
  return arrayPath;
};

module.exports = pathToArrayTransformer;
