/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */
const { unlink } = require('../index');

describe('Unlink objects', () => {
  it('If objects are unlinked changes do not affect eachother', () => {
    const object = { test: true };
    const object2 = unlink(object);
    object2.test2 = true;
    expect(object).toStrictEqual({ test: true });
    expect(object2).toStrictEqual({ test: true, test2: true });
  });
  it('It returns string if input is string', () => {
    const result = unlink('test');
    expect(result).toStrictEqual('test');
  });
});
