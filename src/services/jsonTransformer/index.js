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

  determineWhatToMap(validResults, destinationPath) {
    const toMap = {};
    validResults.forEach((result) => {
      let resolvedDestinationPath = destinationPath;
      if (this.isObject(result.references)) {
        Object.keys(result.references).forEach((reference) => {
          resolvedDestinationPath = resolvedDestinationPath.replace(new RegExp(`\\:\\(${reference}\\)`, 'g'), result.references[reference]);
        });
      }
      if (result.path) {
        toMap[resolvedDestinationPath] = this.makeArray(toMap[resolvedDestinationPath]);
        toMap[resolvedDestinationPath].push(result.value);
      }
    });
    return toMap;
  }

  transform(originPath, destinationPath, originObject, destinationObject) {
    const resolved = this.resolve(originObject, originPath);
    const validResults = resolved.filter((el) => (
      this.settings.ignoreOnTransform.every((toIgnore) => checkEquality(el.value, toIgnore, '!='))));
    const toMap = this.determineWhatToMap(validResults, destinationPath);
    const toMapKeys = Object.keys(toMap);
    toMapKeys.forEach((path) => {
      const valueToBuild = toMap[path].length === 1 ? toMap[path][0] : toMap[path];
      this.build(destinationObject, path, valueToBuild);
    });
    if (this.settings.mapIfNotFound && toMapKeys.length === 0) {
      this.build(destinationObject, destinationPath, undefined);
    }
  }
}

module.exports = JsonTransformer;
