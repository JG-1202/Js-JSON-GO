/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */
const BasicProcessor = require('../src/services/basicProcessor');

const basicProcessor = new BasicProcessor();

describe('Basic Processor', () => {
  it('Chops something not choppable', () => {
    const result = basicProcessor.chop(null, 10);
    expect(result).toStrictEqual([]);
  });
  it('makePathString when it is already a string', () => {
    const result = basicProcessor.makePathString('test');
    expect(result).toStrictEqual('test');
  });
  it('mergeObjects when input is not an array', () => {
    const result = basicProcessor.mergeObjects('test');
    expect(result).toStrictEqual({});
  });
  it('mergeObjects when not every input is not an object', () => {
    const result = basicProcessor.mergeObjects([{ test: true }, null, { test: false }]);
    expect(result).toStrictEqual({ test: false });
  });
  it('mergeArrays when input is not an array', () => {
    const result = basicProcessor.mergeArrays('test');
    expect(result).toStrictEqual([]);
  });
  it('mergeArrays when not every input is not an array', () => {
    const result = basicProcessor.mergeArrays([[1], null, [2]]);
    expect(result).toStrictEqual([1, 2]);
  });
});
