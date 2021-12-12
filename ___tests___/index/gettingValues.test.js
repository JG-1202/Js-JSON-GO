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
});
