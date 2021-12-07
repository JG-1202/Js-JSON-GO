/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */

const JG = require('../../index');
const inputFixture = require('../fixtures/inputFixture.json');

describe('Testing different settings', () => {
  it('defaultGetOneResponse', () => {
    const JsonGo = new JG.Json(inputFixture, { defaultGetOneResponse: 'default' });
    const result = JsonGo.getOne('nonExisting');
    expect(result).toStrictEqual('default');
  });
  it('defaultGetResponse', () => {
    const JsonGo = new JG.Json(inputFixture, { defaultGetResponse: '' });
    const result = JsonGo.get('nonExisting');
    expect(result).toStrictEqual('');
  });
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
