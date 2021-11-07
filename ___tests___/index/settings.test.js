/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */

const JG = require('../../index');
const inputFixture = require('../fixtures/inputFixture.json');

describe('Testing different settings', () => {
  it('defaultGetResponse', () => {
    const JsonGo = new JG.Json(inputFixture, { defaultGetResponse: 'default' });
    const result = JsonGo.get('nonExisting');
    expect(result).toStrictEqual('default');
  });
  it('defaultGetAllResponse', () => {
    const JsonGo = new JG.Json(inputFixture, { defaultGetAllResponse: '' });
    const result = JsonGo.getAll('nonExisting');
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
