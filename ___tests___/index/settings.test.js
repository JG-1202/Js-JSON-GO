/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */

const JG = require('../../index');

describe('Testing different settings', () => {
  it('unlinkInputObject default', () => {
    const testObject = {
      test: true,
    };
    const JsonGo = new JG.Json(testObject, { });
    JsonGo.set('test2', true);
    expect(testObject).toStrictEqual({ test: true, test2: true });
  });
  it('unlinkInputObject true', () => {
    const testObject = {
      test: true,
    };
    const JsonGo = new JG.Json(testObject, { unlinkInputObject: true });
    JsonGo.set('test2', true);
    expect(testObject).toStrictEqual({ test: true });
  });
});
