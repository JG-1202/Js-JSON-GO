/* eslint-disable no-undef */
const checkLowerThan = require('../../src/helpers/query/src/logicalChecks/checkLowerThan');

describe('Testing lower than', () => {
  it('Testing lower than (number)', () => {
    const result = checkLowerThan(2, 3, '<');
    expect(result).toStrictEqual({ result: true, stop: true });
  });
  it('Testing lower than (letter)', () => {
    const result = checkLowerThan('b', 'c', '<');
    expect(result).toStrictEqual({ result: true, stop: true });
  });
  it('Testing not lower than', () => {
    const result = checkLowerThan(1, 1, '<');
    expect(result).toStrictEqual({ result: false, stop: true });
  });
  it('Testing not lower or equal to', () => {
    const result = checkLowerThan(2, 1, '<=');
    expect(result).toStrictEqual({ result: false, stop: true });
  });
  it('Testing lower or equal to', () => {
    const result = checkLowerThan(1, 1, '<=');
    expect(result).toStrictEqual({ result: true, stop: true });
  });
  it('Testing invalid operator', () => {
    const result = checkLowerThan(1, 1, 'x');
    expect(result).toStrictEqual({ stop: false });
  });
});
