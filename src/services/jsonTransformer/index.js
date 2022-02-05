const MapBuilder = require('../mapBuilder');
const checkEquality = require('../querier/src/logicalValidator/logicalChecks/checkEquality');

class JsonTransformer extends MapBuilder {
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
    let destinationObjectToReturn = destinationObject;
    const resolved = this.resolve(originObject, originPath);
    const validResults = resolved.filter((el) => (
      this.settings.ignoreOnTransform.every((toIgnore) => checkEquality(el.value, toIgnore, '!=')))).map((result) => ({
      ...result,
      value: this.settings.formatter(result.value),
    }));
    const toMap = this.determineWhatToMap(validResults, destinationPath, originObject);
    const toMapKeys = Object.keys(toMap);
    toMapKeys.forEach((stringPath) => {
      const value = toMap[stringPath].length === 1 ? toMap[stringPath][0] : toMap[stringPath];
      destinationObjectToReturn = this.buildWithPlaceholders({
        object: destinationObjectToReturn, path: stringPath, value, originObject,
      });
    });
    if (this.settings.mapIfNotFound && toMapKeys.length === 0) {
      destinationObjectToReturn = this.build({
        object: destinationObjectToReturn,
        path: destinationPath,
        originObject,
      });
    }
    return destinationObjectToReturn;
  }
}

module.exports = JsonTransformer;
