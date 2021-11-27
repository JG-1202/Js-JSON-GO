const logicalValidator = require('./src/logicalValidator');
const getRelativeIndex = require('./src/getRelativeIndex');
const doesElementHaveAbsoluteOrRelativePath = require('./src/doesElementHaveAbsoluteOrRelativePath');
const doesElementHaveValue = require('./src/doesElementHaveValue');
const getEndOfArray = require('./src/getEndOfArray');
const isOperationToGetEnd = require('./src/isOperationToGetEnd');
const PathTransformer = require('../pathTransformer');

class Querier extends PathTransformer {
  constructor({
    functions, settings,
  }) {
    super({ settings });
    this.functions = functions;
  }

  getPath(priorPath, element) {
    let newElement = element;
    if (newElement.absolutePath) {
      newElement = {
        path: this.transformPath(newElement.absolutePath),
      };
    } else if (newElement.relativePath) {
      if (newElement.relativeDepth === 0) {
        newElement = {
          relativePath: this.transformPath(newElement.relativePath),
          relativeOrigin: priorPath,
        };
      } else {
        const relativeIndex = getRelativeIndex(
          priorPath.length, newElement.relativeDepth,
        );
        newElement = {
          path: [...priorPath.slice(0, relativeIndex),
            ...this.transformPath(newElement.relativePath, this.functions)],
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
    return !intermediate
    && this.settings.limit
    && this.resultCounter > this.settings.limit;
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
