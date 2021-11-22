/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */
const validateResponseAndPassDefault = require('../src/helpers/validators/validateResponseAndPassDefault');

describe('ValidateResponseAndPassDefault', () => {
  it('Found vs default are not both arrays', () => {
    const result = validateResponseAndPassDefault([], '[]', [null]);
    expect(result).toStrictEqual([]);
  });
});
