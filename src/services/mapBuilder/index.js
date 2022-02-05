const Builder = require('../builder');

const getPlaceholders = require('./src/getPlaceholders');

class MapBuilder extends Builder {
  constructor({
    settings,
  }) {
    super({
      settings,
    });
  }

  determineWhatToBuild({ path, originObject, toBuild }) {
    const placeholders = getPlaceholders(path);
    if (placeholders.length > 0) {
      placeholders.every((match) => {
        const pathToResolve = match.substr(2, match.length - 3);
        const resolved = this.resolve(originObject, pathToResolve);
        resolved.forEach((resolvedPlaceholder) => {
          const mapPath = path.replace(match, resolvedPlaceholder.value);
          toBuild.push(mapPath);
        });
        return resolved.length > 0;
      });
    } else {
      toBuild.push(path);
    }
  }

  buildWithPlaceholders({
    object, path, value, func, originObject,
  }) {
    let tempObj = object;
    const toBuild = [];
    this.determineWhatToBuild({ path, originObject, toBuild });
    toBuild.forEach((pathToBuild) => {
      tempObj = this.build({
        object: tempObj, func, path: pathToBuild, value,
      });
    });
    return tempObj;
  }
}

module.exports = MapBuilder;
