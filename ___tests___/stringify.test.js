/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const { stringify } = require('../index');

describe('Make an array', () => {
  it('Input object will be stringified', () => {
    const result = stringify({ test: true });
    expect(result).toStrictEqual(JSON.stringify({ test: true }));
  });
  it('Stringified object will also stay stringified object', () => {
    const result = stringify(JSON.stringify({ test: true }));
    expect(result).toStrictEqual(JSON.stringify({ test: true }));
  });
  it('Null will return null', () => {
    const result = stringify(null);
    expect(result).toStrictEqual(null);
  });
  it('Undefined will return undefined', () => {
    const result = stringify(undefined);
    expect(result).toStrictEqual(undefined);
  });
  it('Input string will return as is', () => {
    const result = stringify('test');
    expect(result).toStrictEqual('test');
  });
  it('Input array will return a stringified array', () => {
    const result = stringify([true, true]);
    expect(result).toStrictEqual(JSON.stringify([true, true]));
  });
});
