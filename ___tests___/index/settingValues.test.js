/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */
const JG = require('../../index');
const inputFixture = require('../fixtures/inputFixture.json');

describe('Test setting value(s)', () => {
  it('Set element at end of array with $end', () => {
    const JsonGo = new JG.Json({});
    JsonGo.setOne('test', [{ x: 0 }, { x: 2 }]);
    JsonGo.setOne('test[{$end}].t', 1);
    const result = JsonGo.export();
    expect(result).toStrictEqual({ test: [{ x: 0 }, { x: 2, t: 1 }] });
  });
  it('Append element to array', () => {
    const JsonGo = new JG.Json([]);
    JsonGo.setOne('[{$append}]', true);
    const result = JsonGo.export();
    expect(result).toStrictEqual([true]);
  });
  it('Creates object', () => {
    const JsonGo = new JG.Json();
    JsonGo.setOne('test', true);
    const result = JsonGo.export();
    expect(result).toStrictEqual({ test: true });
  });
  it('Creates object on input number as string', () => {
    const JsonGo = new JG.Json();
    JsonGo.setOne('["1"]', true);
    const result = JsonGo.export();
    expect(result).toStrictEqual({ 1: true });
  });
  it('Creates array', () => {
    const JsonGo = new JG.Json();
    JsonGo.setOne('[1]', true);
    const result = JsonGo.export();
    expect(result[1]).toStrictEqual(true);
  });
  it('Set element at end of array with $end when it is not an array results in error based on setting', () => {
    let errorMessage = null;
    try {
      const JsonGo = new JG.Json(undefined, { fatalErrorOnCreate: true });
      JsonGo.setOne('test', {});
      JsonGo.setOne('test[{$end}]', true);
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toBe('Path invalid. No results found for query.');
  });
  it('Set element at end of array with $end when it is not an array results not in error based on settings', () => {
    const JsonGo = new JG.Json(undefined, { fatalErrorOnCreate: false });
    JsonGo.setOne('test', {});
    JsonGo.setOne('test2', {});
    JsonGo.set('test[{$end}]', true);
    JsonGo.setOne('test2[{$end}]', true);
    const result = JsonGo.export();
    expect(result).toStrictEqual({ test: {}, test2: {} });
  });
  it('Test creating inputFixture', () => {
    const JsonGo = new JG.Json({}, { fatalErrorOnCreate: false });
    JsonGo.setOne('holding', 'appleCompany');
    JsonGo.setOne('mainStore', 'Amsterdam');
    JsonGo.setOne('stores[0].storeName', 'Berlin');
    JsonGo.setOne('stores[{$end}].expensive', 5);
    JsonGo.setOne('stores[{$end}].items', inputFixture.stores[0].items);
    JsonGo.setOne('stores[{$append}].storeName', 'Amsterdam');
    JsonGo.setOne('stores[{$.storeName = $mainStore}].expensive', 6);
    JsonGo.setOne('stores[{$append}].storeName', 'Barcelona');
    JsonGo.setOne('stores[{$end}].expensive', 4.50);
    JsonGo.setOne('stores[{$end}].items[1].name', 'Granny Smith medium bag');
    JsonGo.setOne('stores[{$end}].items[1].weight', 2);
    JsonGo.setOne('stores[{$end}].items[1].price', 2);
    JsonGo.setOne('stores[{$end}].items[{$append}].name', 'Granny Smith large bag');
    JsonGo.setOne('stores[{$end}].items[{$end}].weight', 3);
    JsonGo.setOne('stores[{$end}].items[{$end}].price', 3);
    JsonGo.setOne('stores[{$end}].items[0].name', 'Granny Smith small bag');
    JsonGo.setOne('stores[{$end}].items[0].weight', 1);
    JsonGo.setOne('stores[{$end}].items[0].price', 1);
    JsonGo.set('stores[{$end}].items[{$.name}].family', "Granny's");
    JsonGo.set('stores[{$append}]', {
      storeName: 'Rome',
      items: [],
    });
    JsonGo.set('stores[{$.storeName = Rome}].expensive', null);
    JsonGo.set('stores[{$.storeName = $mainStore}].items', inputFixture.stores[1].items);
    JsonGo.set('stores[{$.storeName = $mainStore}].items[{$.price >= $stores[{$.storeName = $mainStore}].expensive}].expensive', true);
    const result = JsonGo.export();
    expect(result).toStrictEqual(inputFixture);
  });
  it('Test creating inputFixture generates error by default on setAll because query not found', () => {
    let errorMessage = null;
    try {
      const JsonGo = new JG.Json({}, { fatalErrorOnCreate: true });
      JsonGo.setOne('holding', 'appleCompany');
      JsonGo.setOne('mainStore', 'Amsterdam');
      JsonGo.setOne('stores[0].storeName', 'Berlin');
      JsonGo.setOne('stores[{$end}].expensive', 5);
      JsonGo.setOne('stores[{$end}].items', inputFixture.stores[0].items);
      JsonGo.set('stores[{$expensive > 100}].items', []); // non-existent test
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toBe('Path invalid. No results found for query.');
  });
  it('Test creating inputFixture generates error by default on set because query not found', () => {
    let errorMessage = null;
    try {
      const JsonGo = new JG.Json({}, { fatalErrorOnCreate: true });
      JsonGo.setOne('holding', 'appleCompany');
      JsonGo.setOne('mainStore', 'Amsterdam');
      JsonGo.setOne('stores[0].storeName', 'Berlin');
      JsonGo.setOne('stores[{$end}].expensive', 5);
      JsonGo.setOne('stores[{$end}].items', inputFixture.stores[0].items);
      JsonGo.setOne('stores[{$.expensive > 99}].items', []); // non-existent test
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toBe('Path invalid. No results found for query.');
  });
  it('Test set vs setAll', () => {
    const array = [0, 0, 0];
    const JsonGo = new JG.Json(array, { limit: 1 });
    JsonGo.set('[*]', 1);
    expect(JsonGo.export()).toStrictEqual([1, 0, 0]);
    JsonGo.setAll('[*]', 2);
    expect(JsonGo.export()).toStrictEqual([2, 2, 2]);
  });
  it('Test with parse is false', () => {
    const testObject = {
      test: {
        bla: JSON.stringify({ foo: { bar: true } }),
      },
    };
    const JsonGo = new JG.Json(testObject, { unlinkInputObject: true, parse: false });
    JsonGo.set('test.bla.foo', 'abc');
    expect(JsonGo.export()).toStrictEqual(testObject);
  });
  it('Test with parse is true', () => {
    const testObject = {
      test: {
        bla: JSON.stringify({ foo: { bar: true } }),
      },
    };
    const JsonGo = new JG.Json(testObject, { unlinkInputObject: true, parse: true });
    JsonGo.setOne('test.bla.foo', 'abc');
    expect(JsonGo.export()).toStrictEqual(testObject);
    JsonGo.set('[{$.bla.foo}].bla.foo', 123);
    expect(JsonGo.export()).toStrictEqual(testObject);
    JsonGo.setOne('[{$.bla.foo}].bla.foo', 123);
    expect(JsonGo.export()).toStrictEqual(testObject);
    JsonGo.setAll('[{$.bla.foo}].bla.foo', 123);
    expect(JsonGo.export()).toStrictEqual(testObject);
  });
  it('It does not fail when non-existing wildcard is attempted to be set', () => {
    const result = JG.set([], 'test[*].test', 8);
    expect(result).toStrictEqual([]);
  });
});

describe('README examples', () => {
  it('set', () => {
    const inputObject = {
      scans: [
        { barcode: 'abc123', accuracy: 90, identifier: 'A' },
        { barcode: 'def456', accuracy: 50, identifier: 'B' },
        { barcode: 'ghi789', accuracy: 94, identifier: 'C' },
      ],
    };
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    JsonGo.set('scans[*].attributes[0].code', 8);
    const result = JsonGo.export();
    expect(result).toStrictEqual({
      scans: [
        {
          barcode: 'abc123', accuracy: 90, identifier: 'A', attributes: [{ code: 8 }],
        },
        {
          barcode: 'def456', accuracy: 50, identifier: 'B', attributes: [{ code: 8 }],
        },
        { barcode: 'ghi789', accuracy: 94, identifier: 'C' },
      ],
    });
  });
  it('setOne', () => {
    const inputObject = {
      scans: [
        { barcode: 'abc123', accuracy: 90, identifier: 'A' },
        { barcode: 'def456', accuracy: 50, identifier: 'B' },
        { barcode: 'ghi789', accuracy: 94, identifier: 'C' },
      ],
    };
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    JsonGo.setOne('scans[{$.accuracy >= 90}].success', true);
    const result = JsonGo.export();
    expect(result).toStrictEqual({
      scans: [
        {
          barcode: 'abc123', accuracy: 90, identifier: 'A', success: true,
        },
        { barcode: 'def456', accuracy: 50, identifier: 'B' },
        { barcode: 'ghi789', accuracy: 94, identifier: 'C' },
      ],
    });
  });
  it('setAll', () => {
    const inputObject = {
      scans: [
        { barcode: 'abc123', accuracy: 90, identifier: 'A' },
        { barcode: 'def456', accuracy: 50, identifier: 'B' },
        { barcode: 'ghi789', accuracy: 94, identifier: 'C' },
      ],
    };
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    JsonGo.setAll('scans[{$.accuracy > 30}].accuracy', 99);
    const result = JsonGo.export();
    expect(result).toStrictEqual({
      scans: [
        { barcode: 'abc123', accuracy: 99, identifier: 'A' },
        { barcode: 'def456', accuracy: 99, identifier: 'B' },
        { barcode: 'ghi789', accuracy: 99, identifier: 'C' },
      ],
    });
  });
  it('set from Map', () => {
    const originObject = null;
    const destinationObject = [{}, {}, {}];
    const JsonGo = new JG.Map(originObject, destinationObject);
    JsonGo.set('[*].attributes[0].code', 8);
    const result = JsonGo.export();
    // eslint-disable-next-line max-len
    expect(result).toStrictEqual([{ attributes: [{ code: 8 }] }, { attributes: [{ code: 8 }] }, { attributes: [{ code: 8 }] }]);
  });
});
