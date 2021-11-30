/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const { makeJson } = require('../index');

describe('Make an array', () => {
  it('Input object stays an object', () => {
    const result = makeJson({ test: true });
    expect(result).toStrictEqual({ test: true });
  });
  it('Null will return an object', () => {
    const result = makeJson(null);
    expect(result).toStrictEqual({});
  });
  it('Undefined will return an object', () => {
    const result = makeJson(undefined);
    expect(result).toStrictEqual({});
  });
  it('Input string will return an object', () => {
    const result = makeJson('test');
    expect(result).toStrictEqual({});
  });
  it('Input array will return an array', () => {
    const result = makeJson([true, true]);
    expect(result).toStrictEqual([true, true]);
  });
});
