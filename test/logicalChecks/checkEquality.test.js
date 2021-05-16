/* eslint-disable no-undef */
const checkEquality = require('../../src/helpers/query/src/logicalChecks/checkEquality');
const inputFixture = require('../fixtures/inputFixture.json');
const unlink = require('../../src/handlers/basic/unlink');

describe('Testing JSON equality', () => {
  it('Testing equality', () => {
    const input = [{ test: [1, 2, 3] }];
    const result = checkEquality(input, [{ test: [1, 2, 3] }], '=');
    expect(result).toStrictEqual({ result: true, stop: true });
  });
  it('Invalid operator will not be tested', () => {
    const input = [{ test: [1, 2, 3] }];
    const result = checkEquality(input, [{ test: [1, 2, 3] }], 'x');
    expect(result).toStrictEqual({ stop: false });
  });
  it('Input fixture is equal to itself', () => {
    const result = checkEquality(inputFixture, inputFixture, '=');
    expect(result).toStrictEqual({ result: true, stop: true });
  });
  it('Input fixture is not unequal to itself', () => {
    const result = checkEquality(inputFixture, inputFixture, '!=');
    expect(result).toStrictEqual({ result: false, stop: true });
  });
  it('Input fixture is equal to its unlinked self', () => {
    const result = checkEquality(inputFixture, unlink(inputFixture), '=');
    expect(result).toStrictEqual({ result: true, stop: true });
  });
  it('Input fixture is not unequal to its unlinked self', () => {
    const result = checkEquality(inputFixture, unlink(inputFixture), '!=');
    expect(result).toStrictEqual({ result: false, stop: true });
  });
});
