class BasicProcessor {
  constructor() {
    this.isObjectLike = (variable) => variable && typeof variable === 'object';
    this.isObject = (variable) => Object.prototype.toString.call(variable) === '[object Object]';
    this.isArray = (variable) => Array.isArray(variable);
  }

  isJson(variable) {
    return this.isArray(variable) || this.isObject(variable);
  }

  makeObject(variable) {
    return this.isObject(variable) ? variable : {};
  }

  makeArray(variable) {
    return this.isArray(variable) ? variable : [];
  }

  makeJson(variable) {
    return this.isJson(variable) ? variable : {};
  }

  stringify(variable) {
    return this.isObjectLike(variable) ? JSON.stringify(variable) : variable;
  }

  safeStringify(variable, defaultValue) {
    try {
      return this.stringify(variable);
    } catch (err) {
      return defaultValue;
    }
  }

  parse(variable) {
    return !this.isObjectLike(variable) ? JSON.parse(variable) : variable;
  }

  safeParse(variable, defaultValue) {
    try {
      return this.parse(variable);
    } catch (err) {
      return defaultValue;
    }
  }

  chop(variable, chopSize) {
    const result = [];
    const toChop = this.safeParse(variable);
    if (this.isArray(toChop)) {
      for (let i = 0; i < toChop.length; i += chopSize) {
        result.push(toChop.slice(i, i + chopSize));
      }
    } else if (this.isObject(toChop)) {
      for (let i = 0; i < Object.entries(toChop).length; i += chopSize) {
        const objectEntries = Object.entries(toChop).slice(i, i + chopSize);
        result.push(objectEntries.reduce((accumulativeObject, [key, value]) => {
          const object = accumulativeObject;
          object[key] = value;
          return object;
        }, {}));
      }
    }
    return result;
  }

  mergeObjects(variableArray) {
    let result = {};
    if (this.isArray(variableArray)) {
      variableArray.forEach((element) => {
        if (this.isObject(element)) {
          result = { ...result, ...element };
        }
      });
    }
    return result;
  }

  mergeArrays(variableArray) {
    const result = [];
    if (this.isArray(variableArray)) {
      variableArray.forEach((element) => {
        if (this.isArray(element)) {
          result.push(...element);
        }
      });
    }
    return result;
  }

  unlink(variable) {
    if (!this.isJson(variable)) {
      return variable;
    }
    if (this.isArray(variable)) {
      const newElement = [];
      variable.forEach((element) => newElement.push(this.unlink(element)));
      return newElement;
    }
    const newElement = {};
    Object.keys(variable).forEach((key) => {
      newElement[key] = this.unlink(variable[key]);
    });
    return newElement;
  }

  makePathString(inputPath) {
    if (!this.isArray(inputPath)) {
      return inputPath;
    }
    let toReturn = '';
    inputPath.forEach((element) => {
      if (element.number !== undefined) {
        toReturn += `[${element.number}]`;
      } else if (!Number.isNaN(Number(element.string))) {
        toReturn += `["${element.string}"]`;
      } else {
        if (toReturn) {
          toReturn += '.';
        }
        toReturn += element.string;
      }
    });
    return toReturn;
  }
}

module.exports = BasicProcessor;
