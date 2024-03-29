/* eslint-disable no-undef */
const {
  getAll, getAllPaths, findAll,
} = require('../../../../index');

/**
 * Check results getAll, vs findAll, vs getPaths vs expected getAll results
 * @param {Object/Array} input
 * @param {String/Array} path
 * @param {Array} results
 */
const test = (input, path, results, expectedReferences) => {
  const getResult = getAll(input, path, null, { limit: 1 });
  const findResult = findAll(input, path, null, { limit: 1 });
  const pathResult = getAllPaths(input, path, null, { limit: 1 });
  expect(findResult.length).toStrictEqual(getResult.length);
  expect(findResult.length).toStrictEqual(pathResult.length);
  expect(getResult).toStrictEqual(results);
  const references = [];
  findResult.forEach((result, index) => {
    expect(result.value).toStrictEqual(getResult[index]);
    const singleResult = getAll(input, result.path);
    expect(typeof result.path).toStrictEqual('string');
    expect(singleResult.length).toStrictEqual(1);
    expect(singleResult).toStrictEqual([result.value]);
    references.push(result.references);
  });
  if (expectedReferences) {
    expect(references).toStrictEqual(expectedReferences);
  }
};

module.exports = test;
