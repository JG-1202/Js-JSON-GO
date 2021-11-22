/* eslint-disable no-undef */
const { get, getPath, find } = require('../../../../index');

/**
 * Check results get, vs find, vs getPath vs expected get result
 * @param {Object/Array} input
 * @param {String/Array} path
 * @param {Array} results
 */
// eslint-disable-next-line complexity
const test = (input, path, result, expectedReferences) => {
  const getResult = get(input, path);
  const findResult = find(input, path);
  const pathResult = getPath(input, path);
  expect(getResult).toStrictEqual(result);
  if (getResult === undefined) {
    expect(getResult).toStrictEqual(pathResult);
  }
  expect(findResult.value).toStrictEqual(getResult);
  expect(findResult.path).toStrictEqual(pathResult);
  if (result !== undefined) {
    expect(get(input, pathResult)).toStrictEqual(result);
    expect(typeof pathResult).toStrictEqual('string');
  }
  if (expectedReferences) {
    expect(findResult.references).toStrictEqual(expectedReferences);
  }
};

module.exports = test;
