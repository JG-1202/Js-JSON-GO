const Builder = require('../builder');
const checkEquality = require('../querier/src/logicalValidator/logicalChecks/checkEquality');

class JsonTransformer extends Builder {
  constructor({
    functions, settings,
  }) {
    super({
      functions, settings,
    });
  }

  determineWhatToMap(resolved, validResults, destinationPath) {
    const toMap = {};
    validResults.every((result) => {
      let resolvedDestinationPath = destinationPath;
      if (this.isObject(resolved.references)) {
        Object.keys(resolved.references).forEach((reference) => {
          resolvedDestinationPath = resolvedDestinationPath.replace(new RegExp(`\\:\\(${reference}\\)`, 'g'), resolved.references[reference]);
        });
      }
      if (result.path || this.settings.mapIfNotFound) {
        toMap[resolvedDestinationPath] = this.makeArray(toMap[resolvedDestinationPath]);
        toMap[resolvedDestinationPath].push(result.value);
      }
      return this.settings.resolveOne === true && Object.keys(toMap).length === 1;
    });
    return toMap;
  }

  transform(originPath, destinationPath, originObject, destinationObject) {
    const resolved = this.resolve(originObject, originPath);
    const validResults = resolved.filter((el) => (
      this.settings.ignoreOnTransform.every((toIgnore) => checkEquality(el.value, toIgnore, '!='))));
    const toMap = this.determineWhatToMap(resolved, validResults, destinationPath);
    Object.keys(toMap).every((path) => {
      const valueArray = this.settings.buildOne === true ? [toMap[path][0]] : toMap[path];
      const valueToBuild = valueArray.length === 1 ? valueArray[0] : valueArray;
      this.build(destinationObject, path, valueToBuild);
      return this.settings.buildOne !== true;
    });
  }
}

module.exports = JsonTransformer;
