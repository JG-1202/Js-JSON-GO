/* eslint-disable class-methods-use-this */
const SettingsLoader = require('../settingsLoader');

class BasicProcessor extends SettingsLoader {
  constructor({ settings }) {
    super({ settings });
  }

  isObjectLike(variable) {
    return variable && typeof variable === 'object';
  }

  isObject(variable) {
    return Object.prototype.toString.call(variable) === '[object Object]';
  }

  isArray(variable) {
    return Array.isArray(variable);
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

  cloneJson(variable) {
    let newElement = {};
    if (this.isArray(variable)) {
      newElement = [];
    }
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const attribute in variable) {
      newElement[attribute] = this.clone(attribute);
    }
    return newElement;
  }

  // eslint-disable-next-line complexity
  clone(variable) {
    if (!this.isObjectLike(variable)) {
      return variable;
    }
    if (this.isJson(variable)) {
      return this.cloneJson();
    }
    if (variable instanceof Date) {
      return new Date(variable);
    }
    if (variable instanceof RegExp) {
      return new RegExp(variable.source, variable.flags);
    }
    if (variable instanceof Set) {
      return new Set(variable);
    }
    if (variable instanceof Map) {
      return new Map(variable);
    }
    return variable;
  }
}

module.exports = BasicProcessor;
