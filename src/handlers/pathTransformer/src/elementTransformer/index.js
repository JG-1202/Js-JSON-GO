const QueryTransformer = require('../queryTransformer');

class ElementTransformer {
  constructor({ functions, element }) {
    this.functions = functions;
    this.getElementAndReference(element);
  }

  getElementAndReference(element) {
    const splittedElement = element.split(':(');
    if (splittedElement.length > 1) {
      const lastElement = splittedElement[splittedElement.length - 1];
      const notAllowedChars = /[[\]{}'"]+/;
      const elementIsValidReference = lastElement.charAt(lastElement.length - 1) === ')' && !notAllowedChars.test(lastElement);
      if (elementIsValidReference) {
        splittedElement.pop();
        this.element = splittedElement.join(':(');
        this.reference = lastElement.slice(0, -1);
        return;
      }
    }
    this.element = element;
  }

  getFirstLastChar() {
    if (!this.firstChar) {
      this.firstChar = this.element.charAt(0);
    }
    if (!this.lastChar) {
      this.lastChar = this.element.charAt(this.element.length - 1);
    }
  }

  transformWildcard() {
    return (['*', '{$all}', '{*}'].indexOf(this.element) > -1 ? { wildcard: true } : null);
  }

  transformString() {
    this.getFirstLastChar();
    return (this.firstChar === this.lastChar && ['"', "'"].indexOf(this.firstChar) > -1
      ? { string: this.element.substr(1, this.element.length - 2) } : null);
  }

  transformNumber() {
    return (!Number.isNaN(Number(this.element)) ? { number: Number(this.element) } : null);
  }

  transformQuery() {
    this.getFirstLastChar();
    if (this.firstChar === '{' && this.lastChar === '}') {
      const queryTransformer = new QueryTransformer({
        functions: this.functions,
        queryString: this.element.substr(1, this.element.length - 2),
      });
      return { query: queryTransformer.transformQuery() };
    }
    return null;
  }

  transformElement() {
    let result;
    [
      'transformWildcard',
      'transformString',
      'transformNumber',
      'transformQuery',
    ].some((check) => {
      result = this[check]();
      return result !== null;
    });
    if (result === null) {
      result = { string: this.element };
    }
    if (this.reference) {
      return {
        ...result,
        reference: this.reference,
      };
    }
    return result;
  }
}

module.exports = ElementTransformer;
