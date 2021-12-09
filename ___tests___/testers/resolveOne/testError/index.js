/* eslint-disable no-undef */
const { getOne, getPath, findOne } = require('../../../../index');

/**
 * Check whether get, find, and getPath all throw the same error
 * @param {Object/Array} input
 * @param {String/Array} path
 * @param {Array} results
 */
const testError = (input, path, errorMessage) => {
  const tests = [getOne, findOne, getPath];
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
