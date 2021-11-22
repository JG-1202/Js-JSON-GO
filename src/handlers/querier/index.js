const pathTransformer = require('../../helpers/pathTransformer');
const logicalValidator = require('./src/logicalValidator');
/**
 * check if operation is to get end of array
 */
const isOperationToGetEnd = (query) => query[0] && query[0].custom === 'end';

/**
 * custom query end
 */
const getEndOfArray = (tempObject) => {
  const arrayEnd = tempObject.length - 1;
  if (arrayEnd >= 0) {
    return [{ number: tempObject.length - 1 }];
  }
  return [];
};

/**
 * checks whether value key is present
 */
const doesElementHaveValue = (element) => (element && element.value !== undefined);

/**
 * checks if either absolutePath or relativePath is present
 */
const doesElementHaveAbsoluteOrRelativePath = (element) => {
  if (element) {
    return (element.absolutePath || element.relativePath);
  }
  return false;
};

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

class Querier {
  constructor({
    functions, settings,
  }) {
    this.functions = functions;
    this.settings = settings;
  }

  getPath(priorPath, element) {
    let newElement = element;
    if (newElement.absolutePath) {
      newElement = {
        path: pathTransformer(newElement.absolutePath, this.functions),
      };
    } else if (newElement.relativePath) {
      if (newElement.relativeDepth === 0) {
        newElement = {
          relativePath: pathTransformer(newElement.relativePath, this.functions),
          relativeOrigin: priorPath,
        };
      } else {
        const relativeIndex = getRelativeIndex(
          priorPath.length, newElement.relativeDepth,
        );
        newElement = {
          path: [...priorPath.slice(0, relativeIndex),
            ...pathTransformer(newElement.relativePath, this.functions)],
        };
      }
    }
    return newElement;
  }

  getValueFromPath(element, object, currentElement, priorPath, refObject) {
    let result = [];
    const transformedPath = this.getPath(priorPath, element, this.functions);
    if (transformedPath && transformedPath.relativePath) {
      result = this.resolve(object, [
        ...priorPath, currentElement, ...transformedPath.relativePath,
      ], refObject, true);
    } else {
      result = this.resolve(
        object, transformedPath.path, refObject, true,
      );
    }
    if (result.length >= 1) {
      return result[0].value;
    }
    return undefined;
  }

  getValue(element, object, currentElement, priorPath, refObject) {
    if (doesElementHaveValue(element)) {
      return element.value;
    }
    if (doesElementHaveAbsoluteOrRelativePath(element)) {
      return this.getValueFromPath(element, object, currentElement, priorPath, refObject);
    }
    return undefined;
  }

  isMaxResultsReached(intermediate) {
    return !intermediate && this.resultCounter > this.settings.limit;
  }

  checkLogic({
    firstPart, operator, secondPart, results, key, checkType, temp, intermediate,
  }) {
    const newResults = results;
    let nextIterationDesired = true;
    if (logicalValidator(firstPart, operator, secondPart, temp)) {
      const toReturn = {};
      toReturn[checkType] = key;
      newResults.push(toReturn);
      nextIterationDesired = !this.isMaxResultsReached(intermediate);
    }
    return nextIterationDesired;
  }

  checkEachElementOfTemp({
    query, object, tempObject, priorPath, checkType, refObject, intermediate,
  }) {
    const results = [];
    Object.keys(tempObject).every((el) => {
      let key = el;
      if (checkType === 'number') {
        key = Number(el);
      }
      const checkElement = {};
      checkElement[checkType] = key;
      const firstPart = this.getValue(query[0], object, checkElement, priorPath, refObject);
      const operator = this.getValue(query[1], object, checkElement, priorPath, refObject);
      const secondPart = this.getValue(query[2], object, checkElement, priorPath, refObject);
      const temp = tempObject[key];
      return this.checkLogic({
        firstPart, operator, secondPart, results, key, checkType, temp, intermediate,
      });
    });
    return results;
  }

  query({
    query, object, tempObject, priorPath, refObject, intermediate,
  }) {
    let checkType = 'string';
    if (Array.isArray(tempObject)) {
      if (isOperationToGetEnd(query)) {
        return getEndOfArray(tempObject);
      }
      checkType = 'number';
    }
    return this.checkEachElementOfTemp({
      query, object, tempObject, priorPath, checkType, refObject, intermediate,
    });
  }
}

module.exports = Querier;
