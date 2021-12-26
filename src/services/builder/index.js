const Resolver = require('../resolver');

const isComplexPathToBuild = require('./src/isComplexPathToBuild');
const setSimplePath = require('./src/setSimplePath');

class Builder extends Resolver {
  constructor({
    settings,
  }) {
    super({
      settings,
    });
  }

  setComplexPath({
    object, arrayPath, value, complexIndex, func,
  }) {
    const complexPart = arrayPath.slice(0, complexIndex);
    const simplePart = arrayPath.slice(complexIndex);
    const allResolved = this.resolve(object, complexPart);
    if (allResolved.length === 0 && this.settings.fatalErrorOnCreate) {
      throw new Error('Path invalid. No results found for query.');
    }
    allResolved.forEach((resolved) => (
      setSimplePath(object, [...resolved.path, ...simplePart], typeof func === 'function' ? func() : value)));
  }

  build({
    object, path, value, func,
  }) {
    const arrayPath = this.transformPath(path);
    const { isComplex, complexIndex } = isComplexPathToBuild(arrayPath);
    if (!isComplex) {
      setSimplePath(object, arrayPath, typeof func === 'function' ? func() : value);
    } else {
      this.setComplexPath({
        object, arrayPath, value, complexIndex, func,
      });
    }
    return object;
  }
}

module.exports = Builder;
