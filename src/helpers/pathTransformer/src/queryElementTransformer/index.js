const validateElement = require('./src/validateElement');
const handlePaths = require('./src/handlers/paths');
const handleRegExp = require('./src/handlers/regExp');
const handleFunctions = require('./src/handlers/functions');
const handleSpecials = require('./src/handlers/specials');
const handleJson = require('./src/handlers/json');

const basicTransformString = require('../basicTransformers/transformString');
const basicTransformNumber = require('../basicTransformers/transformNumber');

const successfulCheckResponse = require('../../../checkFunctionsUntilSuccess/successfulCheckResponse');
const checkFunctionsUntilSuccess = require('../../../checkFunctionsUntilSuccess/checkFunctions');

const specials = ['null', 'undefined', 'true', 'false'];

/**
 * Check whether first n characters of element equal toEqual
 */
const firstNCharactersEqual = (n, element, toEqual) => {
  if (typeof element === 'string') {
    return element.substring(0, n) === toEqual;
  }
  return false;
};

/**
 * Transform if it entails specials
 */
const transformSpecials = ({ element }) => {
  if (specials.indexOf(element) > -1) {
    return successfulCheckResponse({ value: handleSpecials(element) });
  }
  return {};
};

/**
 * Transform if it entails a string
 */
const transformString = ({ element }) => basicTransformString(element, 'value');

/**
 * Transform if it enatails a number
 */
const transformNumber = ({ element }) => basicTransformNumber(element, 'value');

/**
 * Transform if it enatails a JSON object
 */
const transformJSON = ({ element }) => {
  if (firstNCharactersEqual(6, element, '$JSON(')) {
    return successfulCheckResponse(handleJson(element));
  }
  return {};
};

/**
 * Transform if it enatails a regular expression
 */
const transformRegExp = ({ element }) => {
  if (firstNCharactersEqual(8, element, '$RegExp(')) {
    return successfulCheckResponse(handleRegExp(element));
  }
  return {};
};

/**
 * Transform if it enatails a functions
 */
const transformFunctions = ({ element, funcs }) => {
  if (firstNCharactersEqual(10, element, '$Function(')) {
    return successfulCheckResponse(handleFunctions(element, funcs));
  }
  return {};
};

/**
 * Transform if it enatails a path
 */
const transformPaths = ({ element }) => {
  if (typeof element === 'string' && element.charAt(0) === '$') {
    return successfulCheckResponse(handlePaths(element));
  }
  return {};
};

/**
 * Transforms each element of query into workable object representation
 * @param {String} element - string representation of query element
 * @param {Object} funcs - object with functions provided by the user that may be part of the query
 * @returns {Object} - object with keyName the type of element and keyValue the value of element
 */
const queryElementTransformer = (element, funcs) => {
  validateElement(element);
  const checks = [
    transformSpecials,
    transformString,
    transformNumber,
    transformJSON,
    transformRegExp,
    transformFunctions,
    transformPaths,
  ];
  return checkFunctionsUntilSuccess(checks, { element, funcs }, { value: element });
};

module.exports = queryElementTransformer;
