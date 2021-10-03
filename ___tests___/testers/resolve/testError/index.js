/* eslint-disable no-undef */
const { get, getPath, find } = require('../../../../index');

/**
 * Check whether get, find, and getPath all throw the same error
 * @param {Object/Array} input
 * @param {String/Array} path
 * @param {Array} results
 */
const testError = (input, path, errorMessage) => {
  const tests = [get, find, getPath];
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
