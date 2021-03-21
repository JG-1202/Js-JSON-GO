// const unlink = require('../handlers/basic/unlink.js');
const queryElementTransformer = require('./queryElementTransformer.js');

const transformCache = {};

const operators = ['=', '<', '>', '!', '∈', '∉', '@', '?'];

/**
 * Validate if length of result is either 1 or 3, otherwise throw error
 */
const validateResult = (result, query) => {
  if (result.length !== 3 && result.length !== 1) {
    throw new Error(`Invalid query ${query}`);
  }
  return result;
};

/**
 * On opening bracket up array counter by one, on closing bracket lower array counter by one
 */
const handleBrackets = (char, actionVariables) => {
  const newActionVariables = actionVariables;
  if (char === '[') {
    newActionVariables.part += char;
    newActionVariables.arrayCounter += 1;
  } else if (char === ']') {
    newActionVariables.part += char;
    newActionVariables.arrayCounter += -1;
  }
  return newActionVariables;
};

/**
 * Call if first operator is found, pushes current path into results
 */
const handleFirstNonOperator = (char, actionVariables) => {
  const newActionVariables = actionVariables;
  newActionVariables.result.push(
    queryElementTransformer(newActionVariables.part),
  );
  newActionVariables.part = char;
  return newActionVariables;
};

/**
 * Default handler of characters, adds to current part until operator is found
 */
const defaultCharHandler = (char, actionVariables) => {
  let newActionVariables = actionVariables;
  if (operators.indexOf(newActionVariables.part) > -1) {
    newActionVariables = handleFirstNonOperator(char, newActionVariables);
  } else {
    newActionVariables.part += char;
  }
  return newActionVariables;
};

/**
 * Handles quotes to set isString key of actionVariables
 */
// eslint-disable-next-line complexity
const handleQuotes = (char, actionVariables) => {
  let newActionVariables = actionVariables;
  if (!newActionVariables.isString) {
    newActionVariables.isString = char;
  } else if (newActionVariables.isString && char === newActionVariables.isString) {
    newActionVariables.isString = null;
  }
  newActionVariables = defaultCharHandler(char, newActionVariables);
  return newActionVariables;
};

/**
 * Pushes operators into results
 */
const handleOperators = (char, actionVariables) => {
  const newActionVariables = actionVariables;
  if (operators.indexOf(newActionVariables.part) > -1) {
    newActionVariables.part += char;
    newActionVariables.result.push(
      queryElementTransformer(newActionVariables.part),
    );
    newActionVariables.part = '';
  } else {
    newActionVariables.result.push(
      queryElementTransformer(newActionVariables.part),
    );
    newActionVariables.part = char;
  }
  return newActionVariables;
};

/**
 * Handles each character of string and redirects to specific handlers
 */
// eslint-disable-next-line complexity
const handleCharacters = (char, actionVariables) => {
  let newActionVariables = actionVariables;
  if (char === ' ' && !newActionVariables.arrayCounter && !newActionVariables.isString) {
    return newActionVariables;
  }
  if (['[', ']'].indexOf(char) > -1) {
    newActionVariables = handleBrackets(char, newActionVariables);
  } else if (newActionVariables.arrayCounter > 0) {
    newActionVariables.part += char;
  } else if (['"', "'"].indexOf(char) > -1) {
    newActionVariables = handleQuotes(char, newActionVariables);
  } else if (newActionVariables.isString) {
    newActionVariables.part += char;
  } else if (operators.indexOf(char) > -1) {
    newActionVariables = handleOperators(char, newActionVariables);
  } else {
    newActionVariables = defaultCharHandler(char, newActionVariables);
  }
  return newActionVariables;
};

/**
 * Push remaining parts into results
 */
const addFinalResult = (actionVariables) => {
  if (actionVariables.part) {
    actionVariables.result.push(queryElementTransformer(actionVariables.part));
  }
  return actionVariables;
};

/**
 * Transforms string representation of query into workable array representation
 * @param {String} query - string representation of query to be performed
 * @returns {Array} - array representation of query with length of 1 or 3,
 * second element is the operator
 */
const queryTransformer = (query) => {
  if (transformCache[JSON.stringify(query)]) {
    return transformCache[JSON.stringify(query)];
  }
  const substractedQuery = query.split('');
  let actionVariables = {
    result: [],
    isString: null,
    part: '',
    arrayCounter: 0,
  };
  substractedQuery.forEach((char) => {
    actionVariables = handleCharacters(char, actionVariables);
  });
  addFinalResult(actionVariables);
  validateResult(actionVariables.result, query);
  transformCache[JSON.stringify(query)] = actionVariables.result;
  return actionVariables.result;
};

module.exports = queryTransformer;
