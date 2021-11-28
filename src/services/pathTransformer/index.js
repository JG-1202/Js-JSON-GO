const BasicProcessor = require('../basicProcessor');
const ElementTransformer = require('./src/elementTransformer');

class PathTransformer extends BasicProcessor {
  constructor({ functions, settings }) {
    super({ settings });
    this.functions = functions;
  }

  elementTransformer(element) {
    const elementTransformer = new ElementTransformer({
      functions: this.functions,
      element,
    });
    return elementTransformer.transformElement();
  }

  checkCounter({ char, vars }) {
    const variables = vars;
    if (variables.counter === 0) {
      if (variables.part) {
        variables.arrayPath.push(this.elementTransformer(variables.part));
        variables.part = '';
      }
    } else {
      variables.part += char;
    }
  }

  transformPathFromString(path) {
    const vars = {
      counter: 0,
      arrayPath: [],
      part: '',
    };
    path.split('').forEach((char) => {
      if (char === '[') {
        this.checkCounter({ char, vars });
        vars.counter += 1;
      } else if (char === ']') {
        vars.counter += -1;
        this.checkCounter({ char, vars });
      } else if (char === '.') {
        this.checkCounter({ char, vars });
      } else {
        vars.part += char;
      }
    });
    if (vars.part) {
      vars.arrayPath.push(this.elementTransformer(vars.part));
    }
    return vars.arrayPath;
  }

  transformPath(path) {
    if (this.isArray(path)) {
      return path;
    }
    if (typeof path === 'string') {
      return this.transformPathFromString(path);
    }
    throw new Error('Input path is invalid.');
  }
}

module.exports = PathTransformer;
