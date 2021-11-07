/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */
const JG = require('../../index');
const inputFixture = require('../fixtures/inputFixture.json');

describe('Mapping', () => {
  it('Map to new object', () => {
    const JsonGo = new JG.Map(inputFixture, {});
    JsonGo.transform('mainStore', 'test[2].store');
    const result = JsonGo.export();
    const JsonGoOld = new JG.Map(inputFixture, {});
    JsonGoOld.translate('mainStore', 'test[2].store');
    const resultOld = JsonGo.export();
    expect(result).toEqual({ test: [undefined, undefined, { store: 'Amsterdam' }] });
    expect(resultOld).toStrictEqual(result);
  });
  it('Map to new array', () => {
    const JsonGo = new JG.Map(inputFixture, []);
    JsonGo.transform('mainStore', '[0].test[2].store');
    const result = JsonGo.export();
    expect(result).toEqual([{ test: [undefined, undefined, { store: 'Amsterdam' }] }]);
  });
  it('Do not map when no value is found at origin on transform, with resolveOne', () => {
    const JsonGo = new JG.Map(inputFixture, [], { resolveOne: true });
    JsonGo.transform('someUndefined.path', '[0].test[2]');
    const result = JsonGo.export();
    expect(result).toStrictEqual([]);
  });
  it('Do map when no value is found at origin when mapIfNotFound on transform with resolveOne', () => {
    const JsonGo = new JG.Map(inputFixture, [], { mapIfNotFound: true, resolveOne: true });
    JsonGo.transform('someUndefined.path', '[0].test[2]');
    const result = JsonGo.export();
    expect(result).toEqual([{ test: [undefined, undefined, undefined] }]);
  });
  it('Do not map when no value is found at origin on transform', () => {
    const JsonGo = new JG.Map(inputFixture, []);
    JsonGo.transform('someUndefined.path', '[0].test[2]');
    const result = JsonGo.export();
    expect(result).toStrictEqual([]);
  });
  it('Do map when no value is found at origin when mapIfNotFound on transform', () => {
    const JsonGo = new JG.Map(inputFixture, [], { mapIfNotFound: true });
    JsonGo.transform('someUndefined.path', '[0].test[2]');
    const result = JsonGo.export();
    expect(result).toEqual([{ test: [undefined, undefined, []] }]);
  });
  it('Map items of main store to new object', () => {
    const JsonGo = new JG.Map(inputFixture, {});
    JsonGo.transform('stores[{$.storeName = Amsterdam}].items[{$.price >= $stores[{$.storeName = Amsterdam}].expensive}].name', 'stores[{$append}].expensiveItems');
    JsonGo.transform('stores[{$.storeName = Amsterdam}].items[{$.price < $stores[{$.storeName = Amsterdam}].expensive}].name', 'stores[{$end}].nonExpensiveItems');
    const result = JsonGo.export();
    expect(result).toStrictEqual({ stores: [{ expensiveItems: ['Granny Smith large bag', 'Pink Lady medium bag', 'Pink Lady large bag'], nonExpensiveItems: ['Granny Smith small bag', 'Granny Smith medium bag'] }] });
  });
  it('Map all items into all', () => {
    const startingObject = { test: true };
    const start = {
      array: [JG.unlink(startingObject), JG.unlink(startingObject),
        { test: false }, JG.unlink(startingObject)],
    };
    const JsonGo = new JG.Map(inputFixture, start);
    JsonGo.transform('stores[{$.expensive}].expensive', 'array[{$.test}].expensive');
    const result = JsonGo.export();
    const checkObject = { test: true, expensive: [5, 6, 4.5] };
    expect(result).toStrictEqual({
      array: [checkObject, checkObject, { test: false }, checkObject],
    });
  });
  it('Map one item into all that have a test property', () => {
    const startingObject = { test: true };
    const start = {
      array: [JG.unlink(startingObject), JG.unlink(startingObject),
        { test: false }, JG.unlink(startingObject)],
    };
    const JsonGo = new JG.Map(inputFixture, start, { resolveOne: true });
    JsonGo.transform('stores[{$.storeName}].expensive', 'array[{$.test}].expensive');
    const result = JsonGo.export();
    const checkObject = { test: true, expensive: 5 };
    expect(result).toEqual({ array: [checkObject, checkObject, { test: false }, checkObject] });
    const JsonGoOld = new JG.Map(inputFixture, start);
    JsonGoOld.translateOneToAll('stores[{$.storeName}].expensive', 'array[{$.test}].expensive');
    const resultOld = JsonGo.export();
    expect(resultOld).toStrictEqual(result);
  });
  it('Map all items into one', () => {
    const startingObject = { test: true };
    const start = {
      array: [JG.unlink(startingObject), JG.unlink(startingObject),
        { test: false }, JG.unlink(startingObject)],
    };
    const JsonGo = new JG.Map(inputFixture, start, { buildOne: true });
    JsonGo.transform('stores[{$.expensive}].expensive', 'array[{$.test}].expensive');
    const result = JsonGo.export();
    const checkObject = { test: true, expensive: [5, 6, 4.5] };
    expect(result).toStrictEqual({
      array: [checkObject, startingObject, { test: false }, startingObject],
    });
    const JsonGoOld = new JG.Map(inputFixture, start);
    JsonGoOld.translateAll('stores[{$.expensive}].expensive', 'array[{$.test}].expensive');
    const resultOld = JsonGoOld.export();
    expect(resultOld).toStrictEqual(result);
  });
  it('Map all items into one except values that are defined in ignoreOnTransform', () => {
    const startingObject = { test: true };
    const start = {
      array: [JG.unlink(startingObject), JG.unlink(startingObject),
        { test: false }, JG.unlink(startingObject)],
    };
    const JsonGo = new JG.Map(
      inputFixture, start, { ignoreOnTransform: [3, 4, 5], buildOne: true },
    );
    JsonGo.transform('[stores][{$.expensive}:(expensive)].expensive', 'array[{$.test}].expensive');
    const result = JsonGo.export();
    const checkObject = { test: true, expensive: [6, 4.5] };
    expect(result).toStrictEqual({
      array: [checkObject, startingObject, { test: false }, startingObject],
    });
    const JsonGoOld = new JG.Map(
      inputFixture, start, { ignoreOnTransform: [3, 4, 5] },
    );
    JsonGoOld.translateAllToOne('[stores][{$.expensive}:(expensive)].expensive', 'array[{$.test}].expensive');
    const resultOld = JsonGoOld.export();
    expect(resultOld).toStrictEqual(result);
  });
  it('Do not map values defined in ignoreOnTransform', () => {
    const inputObject = {
      value1: true,
      value2: null,
      value3: '',
      value4: 'true',
      value5: 'test',
      value6: false,
      value7: '',
      value8: {},
      value9: [{ test: true }],
    };
    const JsonGo = new JG.Map(inputObject, {}, { ignoreOnTransform: [true, '', null, {}, [{ test: true }]] });
    JsonGo.transform('value1', 'value1');
    JsonGo.transform('value2', 'value2');
    JsonGo.transform('value3', 'value3');
    JsonGo.transform('value4', 'value4');
    JsonGo.transform('value5', 'value5');
    JsonGo.transform('value6', 'value6');
    JsonGo.transform('value7', 'value7');
    JsonGo.transform('value8', 'value8');
    JsonGo.transform('value9', 'value9');
    expect(JsonGo.export()).toStrictEqual({
      value4: 'true',
      value5: 'test',
      value6: false,
    });
  });
  it('Transform all expensive < 6 to their reference', () => {
    const startingObject = { test: true };
    const start = {
      array: [JG.unlink(startingObject), JG.unlink(startingObject),
        { test: false }, JG.unlink(startingObject)],
    };
    const JsonGo = new JG.Map(inputFixture, start);
    JsonGo.transform('stores[{$.expensive < 6}:(store)].expensive', 'array[:(store)].expensive');
    const result = JsonGo.export();
    expect(result).toStrictEqual({
      array: [{ test: true, expensive: 5 }, { test: true },
        { test: false, expensive: 4.5 }, { test: true, expensive: null }],
    });
  });
  it('Transform all expensive < 6 to their reference with buildOne', () => {
    const startingObject = { test: true };
    const start = {
      array: [JG.unlink(startingObject), JG.unlink(startingObject),
        { test: false }, JG.unlink(startingObject)],
    };
    const JsonGo = new JG.Map(inputFixture, start, { buildOne: true });
    JsonGo.transform('stores[{$.expensive < 6}:(store)].expensive', 'array[:(store)].expensive');
    const result = JsonGo.export();
    expect(result).toStrictEqual({
      array: [{ test: true, expensive: 5 }, { test: true },
        { test: false }, { test: true }],
    });
  });
  it('Transform all expensive < 6 to their reference with resolveOne', () => {
    const startingObject = { test: true };
    const start = {
      array: [JG.unlink(startingObject), JG.unlink(startingObject),
        { test: false }, JG.unlink(startingObject)],
    };
    const JsonGo = new JG.Map(inputFixture, start, { resolveOne: true });
    JsonGo.transform('stores[{$.expensive < 6}:(store)].expensive', 'array[:(store)].expensive');
    const result = JsonGo.export();
    expect(result).toStrictEqual({
      array: [{ test: true, expensive: 5 }, { test: true },
        { test: false }, { test: true }],
    });
  });
});
