/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const { parse, safeParse } = require('../index');

describe('Make an array', () => {
  it('Input object stays an object', () => {
    const result = parse({ test: true });
    expect(result).toStrictEqual({ test: true });
  });
  it('Input array stays an array', () => {
    const result = parse([true, true]);
    expect(result).toStrictEqual([true, true]);
  });
  it('Stringified object returns parsed object 1', () => {
    const result = safeParse(JSON.stringify({ test: true }));
    expect(result).toStrictEqual({ test: true });
  });
  it('Stringified object returns parsed object 2', () => {
    const result = parse(JSON.stringify({ test: true }));
    expect(result).toStrictEqual({ test: true });
  });
  it('Safe parse returns default value for non-parsable string input', () => {
    const result = safeParse('test', 'test123');
    expect(result).toStrictEqual('test123');
  });
  it('Stringified number will be unstringified after parse', () => {
    const result = safeParse('12');
    expect(result).toStrictEqual(12);
  });
  it('Non-safe parse returns error for non-parsable string input', () => {
    try {
      parse('test');
    } catch (e) {
      expect(e.message).toBe('Unexpected token e in JSON at position 1');
    }
  });
});
