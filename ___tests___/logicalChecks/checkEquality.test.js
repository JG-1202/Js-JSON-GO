/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const checkEquality = require('../../src/handlers/querier/src/logicalValidator/logicalChecks/checkEquality');
const inputFixture = require('../fixtures/inputFixture.json');

describe('Testing JSON equality', () => {
  it('Testing equality', () => {
    const input = [{ test: [1, 2, 3] }];
    const result = checkEquality(input, [{ test: [1, 2, 3] }], '=');
    expect(result).toStrictEqual(true);
  });
  it('Invalid operator will not be tested', () => {
    const input = [{ test: [1, 2, 3] }];
    const result = checkEquality(input, [{ test: [1, 2, 3] }], 'x');
    expect(result).toStrictEqual(null);
  });
  it('Input fixture is equal to itself', () => {
    const result = checkEquality(inputFixture, inputFixture, '=');
    expect(result).toStrictEqual(true);
  });
  it('Input fixture is not unequal to itself', () => {
    const result = checkEquality(inputFixture, inputFixture, '!=');
    expect(result).toStrictEqual(false);
  });
  it('Input fixture is equal to its unlinked self', () => {
    const result = checkEquality(inputFixture, JSON.parse(JSON.stringify(inputFixture)), '=');
    expect(result).toStrictEqual(true);
  });
  it('Input fixture is not unequal to its unlinked self', () => {
    const result = checkEquality(inputFixture, JSON.parse(JSON.stringify(inputFixture)), '!=');
    expect(result).toStrictEqual(false);
  });
  it('Object is inequal to array', () => {
    const result = checkEquality({}, [], '=');
    expect(result).toStrictEqual(false);
  });
});
