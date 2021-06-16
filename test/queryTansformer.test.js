/* eslint-disable no-undef */
const transform = require('../src/helpers/pathTransformer/src/queryTransformer');

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
