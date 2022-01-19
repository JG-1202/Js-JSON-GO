/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */
const JG = require('../../index');
const inputFixture = require('../fixtures/inputFixture.json');
const inputFixtureObject = require('../fixtures/inputFixtureObject.json');

describe('Test getting value(s)', () => {
  it('Export json', () => {
    const JsonGo = new JG.Json(inputFixture);
    expect(JsonGo.export()).toStrictEqual(inputFixture);
  });
  it('Get last store in list', () => {
    const JsonGo = new JG.Json(inputFixture);
    expect(JsonGo.getOne('stores[{$end}].storeName')).toStrictEqual('Rome');
  });
  it('Get all stores in list', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.get('stores[{$.storeName}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Get first store in list', () => {
    const JsonGo = new JG.Json(inputFixture, { limit: 1 });
    const result = JsonGo.get('stores[{$.storeName}].storeName');
    expect(result).toStrictEqual(['Berlin']);
  });
  it('Get first two stores in list', () => {
    const JsonGo = new JG.Json(inputFixture, { limit: 2 });
    const result = JsonGo.get('stores[{$.storeName}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam']);
  });
  it('Get all stores that have items for sale', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.get('stores[{$.items[{$.name}]}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam', 'Barcelona']);
  });
  it('Get all stores that have Pink Lady for sale', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.get('stores[{$.items[{$.family = \'Pink Lady\'}]}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam']);
  });
  it('Get all stores that have Granny\'s for sale', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.get('stores[{$.items[{$.family = "Granny\'s"}]}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam', 'Barcelona']);
  });
  it('Get first expensive item from Amsterdam', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.getOne('stores[{$.storeName = Amsterdam}].items[{$.price >= $stores[{$.storeName = Amsterdam}].expensive}].name');
    expect(result).toStrictEqual('Granny Smith large bag');
  });
  it('Get all expensive items from Amsterdam', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.get('stores[{$.storeName = Amsterdam}].items[{$.price >= $stores[{$.storeName = Amsterdam}].expensive}].name');
    expect(result).toStrictEqual(['Granny Smith large bag', 'Pink Lady medium bag', 'Pink Lady large bag']);
  });
  it('Get all expensive items from main store', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.get('stores[{$.storeName = $mainStore}].items[{$.price >= $stores[{$.storeName = $mainStore}].expensive}].name');
    expect(result).toStrictEqual(['Granny Smith large bag', 'Pink Lady medium bag', 'Pink Lady large bag']);
  });
  it('Get all objects that have a large expensive bag', () => {
    const JsonGo = new JG.Json(inputFixtureObject);
    const result = JsonGo.get('itemFamilies[{$.large.price > $expensive}]');
    expect(result).toStrictEqual([inputFixtureObject.itemFamilies.Fuji]);
  });
  it('Get all objects of which the price of a small bag is lower than or equal to 1', () => {
    const JsonGo = new JG.Json(inputFixtureObject);
    const result = JsonGo.get('itemFamilies[{$.small.price <= 1}]');
    expect(result).toStrictEqual([inputFixtureObject.itemFamilies["Granny's"]]);
  });
  it('Get last store in list with custom formatter', () => {
    const JsonGo = new JG.Json(inputFixture);
    const customFormatter = (value) => value.toUpperCase();
    expect(JsonGo.getOne('stores[{$end}].storeName', { formatter: customFormatter })).toStrictEqual('ROME');
    expect(JsonGo.findOne('stores[{$end}].storeName', { formatter: customFormatter }).value).toStrictEqual('ROME');
    expect(JsonGo.getOne('stores[{$end}].storeName')).toStrictEqual('Rome');
    expect(JsonGo.findOne('stores[{$end}].storeName').value).toStrictEqual('Rome');
  });
  it('Get something when input is not json', () => {
    const JsonGo = new JG.Json(null);
    const result = JsonGo.get('some.path');
    expect(result).toStrictEqual([]);
  });
  it('Test non existing element when querying with wildcard', () => {
    const JsonGo = new JG.Json({ test: true });
    expect(JsonGo.get('[*]')).toStrictEqual([true]);
    expect(JsonGo.get('[*][*]')).toStrictEqual([]);
    const JsonGo2 = new JG.Json([true]);
    expect(JsonGo2.get('[*]')).toStrictEqual([true]);
    expect(JsonGo2.get('[*][*]')).toStrictEqual([]);
    const JsonGo3 = new JG.Json({ test: null });
    expect(JsonGo3.get('[*]')).toStrictEqual([null]);
    expect(JsonGo3.get('[*][*]')).toStrictEqual([]);
    const JsonGo4 = new JG.Json([null]);
    expect(JsonGo4.get('[*]')).toStrictEqual([null]);
    expect(JsonGo4.get('[*][*]')).toStrictEqual([]);
  });
});

describe('Testing deepParse', () => {
  it('Stringified object within object can not be queried without parse setting', () => {
    const testObject = {
      test: {
        bla: JSON.stringify({ foo: { bar: true } }),
      },
    };
    const JsonGo = new JG.Json(testObject);
    const result = JsonGo.get('test.bla.foo.bar');
    const result2 = JsonGo.get('test[{$.foo.bar = true}]');
    const result3 = JsonGo.get('test.bla[{$.bar = true}]');
    const result4 = JsonGo.get('[{$.bla.foo.bar = true}]');
    const result5 = JsonGo.get('[{$.bla.foo.bar = true}].non.existing');
    const result6 = JsonGo.get('[{$.non.existing = true}].bla.foo');
    expect(result).toStrictEqual([]);
    expect(result2).toStrictEqual([]);
    expect(result3).toStrictEqual([]);
    expect(result4).toStrictEqual([]);
    expect(result5).toStrictEqual([]);
    expect(result6).toStrictEqual([]);
  });

  it('Stringified object within object can be queried with parse = true', () => {
    const testObject = {
      test: {
        bla: JSON.stringify({ foo: { bar: true } }),
      },
    };
    const JsonGo = new JG.Json(testObject, { parse: true });
    expect(JsonGo.settings.parse).toStrictEqual(true);
    const result = JsonGo.get('test.bla.foo.bar');
    const result2 = JsonGo.get('test[{$.foo.bar = true}]');
    const result3 = JsonGo.get('test.bla[{$.bar = true}]');
    const result4 = JsonGo.get('[{$.bla.foo.bar = true}]');
    const result5 = JsonGo.get('[{$.bla.foo.bar = true}].non.existing');
    const result6 = JsonGo.get('[{$.non.existing = true}].bla.foo');
    expect(result).toStrictEqual([true]);
    expect(result2).toStrictEqual([{ foo: { bar: true } }]);
    expect(result3).toStrictEqual([{ bar: true }]);
    expect(result4).toStrictEqual([{ bla: { foo: { bar: true } } }]);
    expect(result5).toStrictEqual([]);
    expect(result6).toStrictEqual([]);
  });
});

const inputObject = {
  scans: [
    { barcode: 'abc123', success: true, identifier: 'A' },
    { barcode: 'def456', success: false, identifier: 'B' },
    { barcode: 'ghi789', success: true, identifier: 'C' },
  ],
};

describe('README examples', () => {
  it('get', () => {
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    const result = JsonGo.get('scans[*].barcode');
    const result2 = JsonGo.get('scans[{$.success = true}].barcode');
    const result3 = JsonGo.get('some.non.existing.path');
    expect(result).toStrictEqual(['abc123', 'def456']);
    expect(result2).toStrictEqual(['abc123', 'ghi789']);
    expect(result3).toStrictEqual([]);
  });
  it('getOne', () => {
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    const result = JsonGo.getOne('scans[*].barcode');
    const result2 = JsonGo.getOne('scans[{$.success = false}].barcode');
    const result3 = JsonGo.getOne('some.non.existing.path');
    expect(result).toStrictEqual('abc123');
    expect(result2).toStrictEqual('def456');
    expect(result3).toStrictEqual(undefined);
  });
  it('getAll', () => {
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    const result = JsonGo.getAll('scans[*].barcode');
    const result2 = JsonGo.getAll('scans[{$.success = false}].barcode');
    const result3 = JsonGo.getAll('some.non.existing.path');
    expect(result).toStrictEqual(['abc123', 'def456', 'ghi789']);
    expect(result2).toStrictEqual(['def456']);
    expect(result3).toStrictEqual([]);
  });
  it('getPaths', () => {
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    const result = JsonGo.getPaths('scans[*].barcode');
    expect(result).toStrictEqual(['scans[0].barcode', 'scans[1].barcode']);
  });
  it('getPath', () => {
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    const result = JsonGo.getPath('scans[*].barcode');
    expect(result).toStrictEqual('scans[0].barcode');
  });
  it('getAllPaths', () => {
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    const result = JsonGo.getAllPaths('scans[*].barcode');
    expect(result).toStrictEqual(['scans[0].barcode', 'scans[1].barcode', 'scans[2].barcode']);
  });
  it('find', () => {
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    const result = JsonGo.find('scans[*].barcode');
    expect(result).toStrictEqual([{ value: 'abc123', path: 'scans[0].barcode', references: {} },
      { value: 'def456', path: 'scans[1].barcode', references: {} }]);
    const result2 = JsonGo.find('scans[*:(scan)].barcode');
    expect(result2).toStrictEqual([{ value: 'abc123', path: 'scans[0].barcode', references: { scan: 0 } },
      { value: 'def456', path: 'scans[1].barcode', references: { scan: 1 } }]);
  });
  it('findOne', () => {
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    const result = JsonGo.findOne('scans[*].barcode');
    expect(result).toStrictEqual({ value: 'abc123', path: 'scans[0].barcode', references: {} });
    const result2 = JsonGo.findOne('scans[*:(scan)].barcode');
    expect(result2).toStrictEqual({ value: 'abc123', path: 'scans[0].barcode', references: { scan: 0 } });
  });
  it('findAll', () => {
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    const result = JsonGo.findAll('scans[*].barcode');
    expect(result).toStrictEqual([{ value: 'abc123', path: 'scans[0].barcode', references: {} },
      { value: 'def456', path: 'scans[1].barcode', references: {} },
      { value: 'ghi789', path: 'scans[2].barcode', references: {} }]);
    const result2 = JsonGo.findAll('scans[*:(scan)].barcode');
    expect(result2).toStrictEqual([{ value: 'abc123', path: 'scans[0].barcode', references: { scan: 0 } },
      { value: 'def456', path: 'scans[1].barcode', references: { scan: 1 } },
      { value: 'ghi789', path: 'scans[2].barcode', references: { scan: 2 } }]);
  });
});
