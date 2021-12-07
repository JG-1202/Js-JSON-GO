/* eslint-disable no-undef */
const { get, getPaths, resolve } = require('../../../../index');

/**
 * Check whether getAll, findAll, and getPaths all throw the same error
 * @param {Object/Array} input
 * @param {String/Array} path
 * @param {Array} results
 */
const testError = (input, path, errorMessage) => {
  const tests = [get, resolve, getPaths];
  tests.forEach((testFunction) => {
    let errMessage = null;
    try {
      testFunction(input, path);
    } catch (err) {
      errMessage = err.message;
    }
    expect(errorMessage).toStrictEqual(errMessage);
  });
};

module.exports = testError;
