class QueryElementTransformer {
  constructor({ functions }) {
    this.functions = functions;
  }

  firstNCharactersOfPartEqual(n, toEqual) {
    return this.part.substring(0, n) === toEqual;
  }

  transformNumber() {
    if (!Number.isNaN(Number(this.part))) {
      return { value: Number(this.part) };
    }
    return undefined;
  }

  transformString() {
    const firstChar = this.part.charAt(0);
    const lastChar = this.part.charAt(this.part.length - 1);
    if (firstChar === lastChar && ['"', "'"].indexOf(firstChar) > -1) {
      return { value: this.part.substr(1, this.part.length - 2) };
    }
    return undefined;
  }

  transformSpecials() {
    if (this.part === 'null') {
      return { value: null };
    }
    if (this.part === 'undefined') {
      return { value: undefined };
    }
    if (this.part === 'true') {
      return { value: true };
    }
    if (this.part === 'false') {
      return { value: false };
    }
    return undefined;
  }

  transformJSON() {
    if (this.firstNCharactersOfPartEqual(6, '$JSON(')) {
      try {
        return { value: JSON.parse(this.part.substr(6, this.part.length - 7)) };
      } catch (err) {
        throw new Error('Invalid JSON provided in query.');
      }
    }
    return undefined;
  }

  transformRegExp() {
    if (this.firstNCharactersOfPartEqual(8, '$RegExp(')) {
      try {
        const remainingElement = this.part.substr(8, this.part.length - 9);
        const matchedFlags = remainingElement.match(/.*\/([gimy]*)$/);
        let flags = '';
        if (matchedFlags[1]) {
          // eslint-disable-next-line prefer-destructuring
          flags = matchedFlags[1];
        }
        const matchedPattern = remainingElement.match(new RegExp(`^/(.*?)/${flags}$`));
        return { value: { regex: new RegExp(matchedPattern[1], flags) } };
      } catch (err) {
        throw new Error('Invalid regular expression, missing / at beginning and between pattern and flags, or flags are invalid. (Don\'t forget to escape special chars.)');
      }
    }
    return undefined;
  }

  transformFunctions() {
    if (this.firstNCharactersOfPartEqual(10, '$Function(')) {
      const functionName = this.part.substr(10, this.part.length - 11);
      if (typeof this.functions[functionName] === 'function') {
        return { value: { function: this.functions[functionName] } };
      }
      return { value: { function: () => false } };
    }
    return undefined;
  }

  transformCustomQuery() {
    if (this.part === '$end') {
      return { custom: 'end' };
    }
    if (this.part === '$append') {
      return { custom: 'append' };
    }
    return undefined;
  }

  transformPaths() {
    const removeFirstChar = (el) => el.substr(1);
    const validatePath = (path) => {
      if (!path) {
        throw new Error('Query element is invalid.');
      }
    };
    if (this.part.charAt(0) === '$') {
      let path = removeFirstChar(this.part);
      if (path.charAt(0) === '.') {
        let relativeDepth = 0;
        path = removeFirstChar(path);
        while (path.charAt(0) === '.') {
          relativeDepth += -1;
          path = removeFirstChar(path);
        }
        validatePath(path);
        return { relativePath: path, relativeDepth };
      }
      validatePath(path);
      return { absolutePath: path };
    }
    return undefined;
  }

  transformQueryElement() {
    let result;
    [
      'transformSpecials',
      'transformString',
      'transformNumber',
      'transformJSON',
      'transformRegExp',
      'transformFunctions',
      'transformCustomQuery',
      'transformPaths',
    ].some((check) => {
      result = this[check]();
      return result !== undefined;
    });
    if (!result) {
      return { value: this.part };
    }
    return result;
  }
}

module.exports = QueryElementTransformer;
