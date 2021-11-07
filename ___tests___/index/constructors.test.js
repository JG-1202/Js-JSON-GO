/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */
const JG = require('../../index');
const inputFixture = require('../fixtures/inputFixture.json');

describe('Testing with multiple JG instances', () => {
  it('settings and functions stay within instance of Json', () => {
    const settingsObjA = {
      defaultGetResponse: null,
      unlinkInputObject: true,
    };
    const settingsObjB = {
      defaultGetAllResponse: null,
      unlinkInputObject: true,
    };
    const functionsObjA = {
      testFunc1: () => true,
      testFunc2: () => true,
    };
    const functionsObjB = {
      testFunc3: () => true,
      testFunc4: () => true,
    };
    const JG_A = new JG.Json(inputFixture, settingsObjA, functionsObjA);
    const JG_B = new JG.Json(inputFixture, settingsObjB, functionsObjB);
    expect(JG_A.settings.defaultGetResponse).toStrictEqual(null);
    expect(JG_A.settings.unlinkInputObject).toStrictEqual(true);
    expect(JG_A.functions.testFunc1).toBeDefined();
    expect(JG_A.functions.testFunc2).toBeDefined();
    expect(JG_A.functions.testFunc3).toBeUndefined();
    expect(JG_B.settings.defaultGetAllResponse).toStrictEqual(null);
    expect(JG_B.settings.defaultGetResponse).toStrictEqual(undefined);
    expect(JG_B.settings.unlinkInputObject).toStrictEqual(true);
    expect(JG_B.functions.testFunc2).toBeUndefined();
    expect(JG_B.functions.testFunc3).toBeDefined();
    expect(JG_B.functions.testFunc4).toBeDefined();
  });
  it('settings and functions stay within instance of Map', () => {
    const settingsObjA = {
      defaultGetResponse: null,
      unlinkInputObject: true,
    };
    const settingsObjB = {
      defaultGetAllResponse: null,
      unlinkInputObject: true,
    };
    const functionsObjA = {
      testFunc1: () => true,
      testFunc2: () => true,
    };
    const functionsObjB = {
      testFunc3: () => true,
      testFunc4: () => true,
    };
    const JG_A = new JG.Map(inputFixture, {}, settingsObjA, functionsObjA);
    const JG_B = new JG.Map(inputFixture, {}, settingsObjB, functionsObjB);
    const testA = [JG_A, JG_A.originObject, JG_A.destinationObject];
    const testB = [JG_B, JG_B.originObject, JG_B.destinationObject];
    testA.forEach((test) => {
      expect(test.settings.defaultGetResponse).toStrictEqual(null);
      expect(test.settings.unlinkInputObject).toStrictEqual(true);
      expect(test.functions.testFunc1).toBeDefined();
      expect(test.functions.testFunc2).toBeDefined();
      expect(test.functions.testFunc3).toBeUndefined();
    });
    testB.forEach((test) => {
      expect(test.settings.defaultGetAllResponse).toStrictEqual(null);
      expect(test.settings.defaultGetResponse).toStrictEqual(undefined);
      expect(test.settings.unlinkInputObject).toStrictEqual(true);
      expect(test.functions.testFunc2).toBeUndefined();
      expect(test.functions.testFunc3).toBeDefined();
      expect(test.functions.testFunc4).toBeDefined();
    });
  });
});
