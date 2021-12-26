const Builder = require('../builder');
const checkEquality = require('../querier/src/logicalValidator/logicalChecks/checkEquality');

class JsonTransformer extends Builder {
  constructor({
    settings,
  }) {
    super({
      settings,
    });
  }

  determineWhatToMap(validResults, destinationPath) {
    const toMap = {};
    validResults.forEach((result) => {
      let resolvedDestinationPath = destinationPath;
      Object.keys(result.references).forEach((reference) => {
        resolvedDestinationPath = resolvedDestinationPath.replace(new RegExp(`\\:\\(${reference}\\)`, 'g'), result.references[reference]);
      });
      toMap[resolvedDestinationPath] = this.makeArray(toMap[resolvedDestinationPath]);
      toMap[resolvedDestinationPath].push(result.value);
    });
    return toMap;
  }

  transform(originPath, destinationPath, originObject, destinationObject) {
    const resolved = this.resolve(originObject, originPath);
    const validResults = resolved.filter((el) => (
      this.settings.ignoreOnTransform.every((toIgnore) => checkEquality(el.value, toIgnore, '!=')))).map((result) => ({
      ...result,
      value: this.settings.formatter(result.value),
    }));
    const toMap = this.determineWhatToMap(validResults, destinationPath);
    const toMapKeys = Object.keys(toMap);
    toMapKeys.forEach((path) => {
      const value = toMap[path].length === 1 ? toMap[path][0] : toMap[path];
      this.build({ object: destinationObject, path, value });
    });
    if (this.settings.mapIfNotFound && toMapKeys.length === 0) {
      this.build({ object: destinationObject, path: destinationPath });
    }
  }
}

module.exports = JsonTransformer;
