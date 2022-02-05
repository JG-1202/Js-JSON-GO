/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */
const JG = require('../../index');
const inputFixture = require('../fixtures/inputFixture.json');

describe('Testing with multiple JG instances', () => {
  it('settings and functions stay within instance of Json', () => {
    const functionsObjA = {
      testFunc1: () => true,
      testFunc2: () => true,
    };
    const functionsObjB = {
      testFunc3: () => true,
      testFunc4: () => true,
    };
    const settingsObjA = {
      limit: 3,
      unlinkInputObject: true,
      functions: functionsObjA,
    };
    const settingsObjB = {
      unlinkInputObject: true,
      functions: functionsObjB,
    };
    const JG_A = new JG.Json(inputFixture, settingsObjA);
    const JG_B = new JG.Json(inputFixture, settingsObjB);
    expect(JG_A.settings.unlinkInputObject).toStrictEqual(true);
    expect(JG_A.settings.limit).toStrictEqual(3);
    expect(JG_A.settings.functions.testFunc1).toBeDefined();
    expect(JG_A.settings.functions.testFunc2).toBeDefined();
    expect(JG_A.settings.functions.testFunc3).toBeUndefined();
    expect(JG_B.settings.unlinkInputObject).toStrictEqual(true);
    expect(JG_B.settings.limit).toStrictEqual(0);
    expect(JG_B.settings.functions.testFunc2).toBeUndefined();
    expect(JG_B.settings.functions.testFunc3).toBeDefined();
    expect(JG_B.settings.functions.testFunc4).toBeDefined();
  });
  it('settings and functions stay within instance of Map', () => {
    const functionsObjA = {
      testFunc1: () => true,
      testFunc2: () => true,
    };
    const functionsObjB = {
      testFunc3: () => true,
      testFunc4: () => true,
    };
    const settingsObjA = {
      unlinkInputObject: true,
      limit: 3,
      functions: functionsObjA,
    };
    const settingsObjB = {
      unlinkInputObject: true,
      functions: functionsObjB,
    };
    const JG_A = new JG.Map(inputFixture, {}, settingsObjA);
    const JG_B = new JG.Map(inputFixture, {}, settingsObjB);
    const testA = [JG_A.originObject, JG_A.destinationObject];
    const testB = [JG_B.originObject, JG_B.destinationObject];
    testA.forEach((test) => {
      expect(test.settings.unlinkInputObject).toStrictEqual(true);
      expect(test.settings.limit).toStrictEqual(3);
      expect(test.settings.functions.testFunc1).toBeDefined();
      expect(test.settings.functions.testFunc2).toBeDefined();
      expect(test.settings.functions.testFunc3).toBeUndefined();
    });
    testB.forEach((test) => {
      expect(test.settings.unlinkInputObject).toStrictEqual(true);
      expect(test.settings.limit).toStrictEqual(0);
      expect(test.settings.functions.testFunc2).toBeUndefined();
      expect(test.settings.functions.testFunc3).toBeDefined();
      expect(test.settings.functions.testFunc4).toBeDefined();
    });
  });
  it('Parses input object', () => {
    const testObject = { test: true };
    const json = new JG.Json(JSON.stringify(testObject));
    expect(json.object).toStrictEqual(testObject);
    const map = new JG.Map(JSON.stringify(testObject), JSON.stringify(testObject));
    expect(map.originObject.object).toStrictEqual(testObject);
    expect(map.destinationObject.object).toStrictEqual(testObject);
  });
  it('Map.set is updating destination object', () => {
    // eslint-disable-next-line global-require
    const Json = require('../../src/clients/json');
    jest.mock('../../src/clients/json');
    const JGMap = new JG.Map(inputFixture, {});
    JGMap.destinationObject = new Json();
    JGMap.set('path', 'value', { limit: 3 });
    expect(JGMap.export()).toStrictEqual({ path: 'value' });
  });
  it('Map.build is updating destination object', () => {
    // eslint-disable-next-line global-require
    const Json = require('../../src/clients/json');
    jest.mock('../../src/clients/json');
    const JGMap = new JG.Map(inputFixture, {});
    JGMap.destinationObject = new Json();
    JGMap.build('path', () => true, { limit: 3 });
    expect(JGMap.export()).toStrictEqual({ path: true });
  });
});
