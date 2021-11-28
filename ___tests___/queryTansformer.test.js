/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const QueryTransformer = require('../src/services/pathTransformer/src/queryTransformer');

const transform = (queryString) => {
  const queryTransformer = new QueryTransformer({ queryString });
  return queryTransformer.transformQuery();
};

describe('Test different queries to transform from string to array', () => {
  it('1 = 1', () => {
    const result = transform('1=1');
    expect(result).toStrictEqual([{ value: 1 }, { value: '=' }, { value: 1 }]);
  });
  it('1 => "1"', () => {
    const result = transform('1 => "1"');
    expect(result).toStrictEqual([{ value: 1 }, { value: '=>' }, { value: '1' }]);
  });
  it('1 => $test[{}{{{}}}]', () => {
    const result = transform('1 => $test[{}{{{}}}]');
    expect(result).toStrictEqual([{ value: 1 }, { value: '=>' }, { absolutePath: 'test[{}{{{}}}]' }]);
  });
  it('1 => "$test[{}{{{}}}]"', () => {
    const result = transform('1 => "$test[{}{{{}}}]"');
    expect(result).toStrictEqual([{ value: 1 }, { value: '=>' }, { value: '$test[{}{{{}}}]' }]);
  });
  it('["<"] => "="', () => {
    const result = transform('["<"] => "="');
    expect(result).toStrictEqual([{ value: '["<"]' }, { value: '=>' }, { value: '=' }]);
  });
  it('"====" = "="', () => {
    const result = transform('"====" = "="');
    expect(result).toStrictEqual([{ value: '====' }, { value: '=' }, { value: '=' }]);
  });
  it('"===="="="', () => {
    const result = transform('"===="="="');
    expect(result).toStrictEqual([{ value: '====' }, { value: '=' }, { value: '=' }]);
  });
  it('is an invalid query', () => {
    try {
      transform('1 => "1" = 1');
    } catch (e) {
      expect(e.message).toStrictEqual('Invalid query 1 => "1" = 1');
    }
  });
});
describe('Testing with regular expressions', () => {
  it('regex without flags', () => {
    const result = transform('$.storeName ? $RegExp(/\\w+/)');
    expect(result).toStrictEqual([{ relativeDepth: 0, relativePath: 'storeName' }, { value: '?' }, { value: { regex: /\w+/ } }]);
  });
  it('regex with flags', () => {
    const result = transform('$.storeName ? $RegExp(/\\w+/gi)');
    expect(result).toStrictEqual([{ relativeDepth: 0, relativePath: 'storeName' }, { value: '?' }, { value: { regex: /\w+/gi } }]);
  });
  it('invalid regex', () => {
    let result = null;
    try {
      transform('$.storeName ? $RegExp(\\w+)');
    } catch (err) {
      result = err.message;
    }
    expect(result).toStrictEqual('Invalid regular expression, missing / at beginning and between pattern and flags, or flags are invalid. (Don\'t forget to escape special chars.)');
  });
});
// $.storeName ? $RegExp(/.*AMS.*/)
