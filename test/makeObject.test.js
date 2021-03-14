/* eslint-disable no-undef */
const { makeObject } = require('../index');

describe('Make an array', () => {
  it('Input object stays an object', () => {
    const result = makeObject({ test: true });
    expect(result).toStrictEqual({ test: true });
  });
  it('Stringified object will also be an object', () => {
    const result = makeObject(JSON.stringify({ test: true }));
    expect(result).toStrictEqual({ test: true });
  });
  it('Null will return an object', () => {
    const result = makeObject(null);
    expect(result).toStrictEqual({});
  });
  it('Undefined will return an object', () => {
    const result = makeObject(undefined);
    expect(result).toStrictEqual({});
  });
  it('Input string will return an object', () => {
    const result = makeObject('test');
    expect(result).toStrictEqual({});
  });
  it('Input array will return an object', () => {
    const result = makeObject([true, true]);
    expect(result).toStrictEqual({});
  });
});
