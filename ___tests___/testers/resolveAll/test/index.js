/* eslint-disable no-undef */
const { getAll, getPaths, findAll } = require('../../../../index');

/**
 * Check results getAll, vs findAll, vs getPaths vs expected getAll results
 * @param {Object/Array} input
 * @param {String/Array} path
 * @param {Array} results
 */
const test = (input, path, results) => {
  const getResult = getAll(input, path);
  const findResult = findAll(input, path);
  const pathResult = getPaths(input, path);
  expect(findResult.length).toStrictEqual(getResult.length);
  expect(findResult.length).toStrictEqual(pathResult.length);
  expect(getResult).toStrictEqual(results);
  findResult.forEach((result, index) => {
    expect(result.value).toStrictEqual(getResult[index]);
    const singleResult = getAll(input, result.path);
    expect(typeof result.path).toStrictEqual('string');
    expect(singleResult.length).toStrictEqual(1);
    expect(singleResult).toStrictEqual([result.value]);
  });
};

module.exports = test;
