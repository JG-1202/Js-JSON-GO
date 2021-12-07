const checkEquality = require('../../../services/querier/src/logicalValidator/logicalChecks/checkEquality');

const replaceReferences = (references, destinationPath) => {
  let newPath = destinationPath;
  if (references) {
    Object.keys(references).forEach((reference) => {
      newPath = newPath.replace(new RegExp(`\\:\\(${reference}\\)`, 'g'), references[reference]);
    });
  }
  return newPath;
};

const returnEither = (valueA, valueB) => valueA || valueB;

const determineWhatToMap = (validResults, destinationPath, settings) => {
  const toMap = {};
  const { mapIfNotFound } = settings;
  validResults.forEach((result) => {
    const resolvedPath = replaceReferences(result.references, destinationPath);
    if (returnEither(result.path, mapIfNotFound)) {
      if (!toMap[resolvedPath]) {
        toMap[resolvedPath] = [];
      }
      toMap[resolvedPath].push(result.value);
    }
  });
  return toMap;
};

const mapResponses = (findResult, destinationObject, destinationPath, functions, settings) => {
  const { buildOne, ignoreOnTransform } = settings;
  const validResults = findResult.filter((el) => (
    ignoreOnTransform.every((toIgnore) => checkEquality(el.value, toIgnore, '!='))));
  const toMap = determineWhatToMap(validResults, destinationPath, settings);
  Object.keys(toMap).every((path) => {
    const result = toMap[path].length === 1 ? toMap[path][0] : toMap[path];
    if (buildOne === true) {
      destinationObject.setOne(path, result, functions, settings);
    } else {
      destinationObject.set(path, result, functions, settings);
    }
    return buildOne !== true;
  });
};

/**
 * transform service to be called from class
 * @param {String} originPath path from where data should be obtained from origin object
 * @param {originPath} destinationPath path to where data should be mapped into destination
 * object
 * @param {Object} functions custom functions to be used to resolve
 * @param {Object} constructorsObject this constructors object
 * @returns translate response
 */
const transformService = (
  originPath, destinationPath, functions, constructorsObject,
) => {
  const { settings, originObject, destinationObject } = constructorsObject;
  const { resolveOne, defaultGetResponse } = settings;
  if (resolveOne === true) {
    return mapResponses(
      [originObject.resolveOne(originPath, functions, settings)],
      destinationObject,
      destinationPath,
      functions,
      settings,
    );
  }
  const resolveResult = originObject.resolve(originPath, functions, settings);
  return mapResponses(
    resolveResult.length > 0 ? resolveResult : [{ value: defaultGetResponse }],
    destinationObject,
    destinationPath,
    functions,
    settings,
  );
};

module.exports = transformService;
