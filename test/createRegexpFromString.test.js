/* eslint-disable no-undef */
const createRegExpFromString = require('../src/helpers/pathTransformer/src/queryElementTransformHelpers/createRegexpFromString');

describe('Test to create regular expression from string', () => {
  it('regex without flags', () => {
    const result = createRegExpFromString('/\\w+/');
    expect(result).toStrictEqual(/\w+/);
  });
  it('regex with flags', () => {
    const result = createRegExpFromString('/\\w+/gi');
    expect(result).toStrictEqual(/\w+/gi);
  });
  it('Invalid regex (missing /)', () => {
    let result = null;
    try {
      createRegExpFromString('\\w+');
    } catch (err) {
      result = err.message;
    }
    expect(result).toStrictEqual('Invalid regular expression, missing / at beginning and beteen pattern and flags, or flags are invalid. (Don\'t forget to escape special chars.)');
  });
});
