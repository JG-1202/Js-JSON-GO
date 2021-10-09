/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const { makeArray } = require('../index');

describe('Make an array', () => {
  it('Input array stays an array', () => {
    const result = makeArray([true, true]);
    expect(result).toStrictEqual([true, true]);
  });
  it('Stringified array will also be an array', () => {
    const result = makeArray(JSON.stringify([true, true]));
    expect(result).toStrictEqual([true, true]);
  });
  it('Null will return an array', () => {
    const result = makeArray(null);
    expect(result).toStrictEqual([]);
  });
  it('Undefined will return an array', () => {
    const result = makeArray(undefined);
    expect(result).toStrictEqual([]);
  });
  it('Input string will return an array', () => {
    const result = makeArray('test');
    expect(result).toStrictEqual([]);
  });
  it('Input object will return an array', () => {
    const result = makeArray({ test: true });
    expect(result).toStrictEqual([]);
  });
});
