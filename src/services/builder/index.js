const Resolver = require('../resolver');

const isComplexPathToBuild = require('./src/isComplexPathToBuild');
const setSimplePath = require('./src/setSimplePath');

class Builder extends Resolver {
  constructor({
    functions, settings,
  }) {
    super({
      functions, settings,
    });
  }

  setComplexPath({
    obj, arrayPath, val, complexIndex,
  }) {
    const complexPart = arrayPath.slice(0, complexIndex);
    const simplePart = arrayPath.slice(complexIndex);
    const allResolved = this.resolve(obj, complexPart);
    if (allResolved.length === 0 && this.settings.fatalErrorOnCreate) {
      throw new Error('Path invalid. No results found for query.');
    }
    allResolved.forEach((resolved) => setSimplePath(obj, [...resolved.path, ...simplePart], val));
  }

  build(obj, path, val) {
    const arrayPath = this.transformPath(path);
    const { isComplex, complexIndex } = isComplexPathToBuild(arrayPath);
    if (!isComplex) {
      setSimplePath(obj, arrayPath, val);
    } else {
      this.setComplexPath({
        obj, arrayPath, val, complexIndex,
      });
    }
    return obj;
  }
}

module.exports = Builder;
