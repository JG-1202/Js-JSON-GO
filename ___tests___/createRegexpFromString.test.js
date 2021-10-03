/* eslint-disable no-undef */
const createRegExpFromString = require('../src/helpers/pathTransformer/src/queryElementTransformer/src/handlers/regExp');

describe('Test to create regular expression from string', () => {
  it('regex without flags', () => {
    const result = createRegExpFromString('$RegExp(/\\w+/)');
    expect(result).toStrictEqual({ value: { regex: /\w+/ } });
  });
  it('regex with flags', () => {
    const result = createRegExpFromString('$RegExp(/\\w+/gi)');
    expect(result).toStrictEqual({ value: { regex: /\w+/gi } });
  });
  it('Invalid regex (missing /)', () => {
    let result = null;
    try {
      createRegExpFromString('$RegExp(\\w+)');
    } catch (err) {
      result = err.message;
    }
    expect(result).toStrictEqual('Invalid regular expression, missing / at beginning and between pattern and flags, or flags are invalid. (Don\'t forget to escape special chars.)');
  });
});
