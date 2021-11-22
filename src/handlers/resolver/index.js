const Querier = require('../querier');
const makeObject = require('../make/makeObject');
const pathTransformer = require('../../helpers/pathTransformer');
const isObject = require('./src/isObject');

const validateOutput = require('./src/validateOutput');
const updateReferences = require('./src/updateReferences');
const simpleResolve = require('./src/simpleResolve');
const isComplexPathToResolve = require('./src/isComplexPathToResolve');
const getNextIterationsTempObject = require('./src/getNextIterationsTempObject');

class Resolver extends Querier {
  constructor({
    functions, settings,
  }) {
    const settingsObject = makeObject(settings);
    super({
      functions, settings: settingsObject,
    });
  }

  addMultipleResults({
    arrayPath, index, elementValues, remainingPath, obj, results, refObject, element, intermediate,
  }) {
    const previousPath = arrayPath.slice(0, index);
    elementValues.forEach((elementValue) => {
      updateReferences({
        currentReference: element.reference,
        resolvedElement: elementValue,
        refObject,
      });
      const checkPath = [
        ...previousPath, elementValue, ...remainingPath,
      ];
      const resolved = this.resolve(obj, checkPath, refObject, true);
      resolved.every((resolveResult) => (
        this.addResult({ ...resolveResult, results, intermediate })
      ));
    });
  }

  getMultiplePathElements({
    element, obj, tempObject, type, priorPath, refObject, intermediate,
  }) {
    const results = [];
    if (element[type] !== undefined) {
      results.push(element);
    } else if (element.query) {
      const queryResult = this.query({
        query: element.query, object: obj, tempObject, priorPath, refObject, intermediate,
      });
      queryResult.forEach((result) => {
        if (result[type] !== undefined) {
          results.push(result);
        }
      });
    }
    return results;
  }

  getPathElements({
    element, obj, tempObject, type, priorPath, refObject, intermediate,
  }) {
    if (element.wildcard) {
      const toReturn = [];
      if (type === 'number') {
        if (Array.isArray(tempObject)) {
          tempObject.some((el, index) => {
            toReturn.push({ number: index });
            return this.isMaxResultsReached(intermediate);
          });
        }
      } else if (isObject(tempObject)) {
        Object.keys(tempObject).some((el) => {
          toReturn.push({ string: el });
          return this.isMaxResultsReached(intermediate);
        });
      }
      return toReturn;
    }
    return this.getMultiplePathElements({
      element, obj, tempObject, type, priorPath, refObject, intermediate,
    });
  }

  // eslint-disable-next-line max-lines-per-function
  resolveIteration({
    element, obj, tempObject, priorPath, results, index, arrayPath, refObject, intermediate,
  }) {
    const type = Array.isArray(tempObject) ? 'number' : 'string';
    let tempObj = tempObject;
    const arrPath = arrayPath;
    const elementValues = this.getPathElements({
      element, obj, tempObject, type, priorPath, refObject, intermediate,
    });
    if (elementValues.length > 1) {
      const remainingPath = arrayPath.slice(index + 1);
      this.addMultipleResults({
        // eslint-disable-next-line max-len
        arrayPath, index, elementValues, remainingPath, obj, results, refObject, element, intermediate,
      });
    }
    tempObj = getNextIterationsTempObject({ elementValues, tempObj, type });
    if (elementValues.length === 1 && typeof elementValues[0] === 'object') {
      // eslint-disable-next-line prefer-destructuring
      arrPath[index] = elementValues[0];
      updateReferences({
        currentReference: element.reference, resolvedElement: elementValues[0], refObject,
      });
    }
    priorPath.push(arrPath[index]);
    return { ...validateOutput(tempObj, arrPath.length - 1 === index) };
  }

  initiateResolver({ references, path, intermediate }) {
    if (!intermediate) {
      this.resultCounter = 0;
    }
    return {
      refObject: makeObject(references),
      arrayPath: pathTransformer(path, this.functions),
      priorPath: [],
      results: [],
    };
  }

  addResult({
    results, path, value, references, intermediate,
  }) {
    if (!intermediate) {
      this.resultCounter += 1;
      if (this.isMaxResultsReached(intermediate)) {
        return false;
      }
    }
    results.push({ path, value, references });
    return true;
  }

  resolve(obj, path, references, intermediate) {
    const {
      refObject, arrayPath, priorPath, results,
    } = this.initiateResolver({ references, path, intermediate });
    if (!isComplexPathToResolve(arrayPath)) {
      return simpleResolve({
        arrayPath, obj, refObject,
      });
    }
    let tempObject = obj;
    arrayPath.every((element, index) => {
      const { shouldItContinue, newTempObject } = this.resolveIteration({
        element, obj, tempObject, priorPath, results, index, arrayPath, refObject, intermediate,
      });
      tempObject = newTempObject;
      return shouldItContinue;
    });
    if (tempObject !== undefined) {
      this.addResult({
        results, path: priorPath, value: tempObject, references: { ...refObject }, intermediate,
      });
    }
    return results;
  }
}

module.exports = Resolver;
