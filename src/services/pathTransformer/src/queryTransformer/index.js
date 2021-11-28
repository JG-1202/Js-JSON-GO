const QueryElementTransformer = require('../queryElementTransformer');

const operators = ['=', '<', '>', '!', '∈', '∉', '@', '?'];

class queryTransformer extends QueryElementTransformer {
  constructor({ functions, queryString }) {
    super({ functions });
    this.functions = functions;
    this.queryString = queryString;
    this.result = [];
    this.isString = null;
    this.part = '';
    this.arrayCounter = 0;
  }

  charIsBracket(char) {
    if (char === '[') {
      this.part += char;
      this.arrayCounter += 1;
      return true;
    } if (char === ']') {
      this.part += char;
      this.arrayCounter += -1;
      return true;
    }
    return false;
  }

  charMayBeIgnored(char) {
    return char === ' ' && !this.arrayCounter && !this.isString;
  }

  arrayCounterHigherThanOne(char) {
    if (this.arrayCounter > 0) {
      this.part += char;
      return true;
    }
    return false;
  }

  defaultCharHandler(char) {
    if (operators.indexOf(this.part) > -1) {
      this.result.push(
        this.transformQueryElement(),
      );
      this.part = char;
    } else {
      this.part += char;
    }
  }

  charIsQuote(char) {
    if (['"', "'"].indexOf(char) > -1) {
      if (!this.isString) {
        this.isString = char;
      } else if (char === this.isString) {
        this.isString = null;
      }
      this.defaultCharHandler(char);
      return true;
    }
    return false;
  }

  partIsString(char) {
    if (this.isString) {
      this.part += char;
      return true;
    }
    return false;
  }

  charIsOperator(char) {
    if (operators.indexOf(char) > -1) {
      if (operators.indexOf(this.part) > -1) {
        this.part += char;
        this.result.push(this.transformQueryElement());
        this.part = '';
      } else {
        this.result.push(this.transformQueryElement());
        this.part = char;
      }
      return true;
    }
    return false;
  }

  validateResult() {
    if (this.result.length !== 3 && this.result.length !== 1) {
      throw new Error(`Invalid query ${this.queryString}`);
    }
  }

  transformQuery() {
    const checks = [
      'charMayBeIgnored',
      'charIsBracket',
      'arrayCounterHigherThanOne',
      'charIsQuote',
      'partIsString',
      'charIsOperator',
      'defaultCharHandler',
    ];
    this.queryString.split('').forEach((char) => {
      this.continue = true;
      checks.some((check) => this[check](char));
    });
    if (this.part) {
      this.result.push(this.transformQueryElement());
    }
    this.validateResult();
    return this.result;
  }
}

module.exports = queryTransformer;
