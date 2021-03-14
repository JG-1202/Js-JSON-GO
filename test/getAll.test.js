/* eslint-disable no-undef */
const { getAll } = require('../index.js');
const inputFixture = require('./fixtures/inputFixture.json');

const testObject = {
  stores: {
    0: {
      storeName: 'Berlin',
    },
  },
};
// const inputFixtureObject = require('./fixtures/inputFixtureObject.json');

describe('Test getAll function', () => {
  it('Get from array if number 1', () => {
    const result = getAll(inputFixture, 'stores[0].storeName');
    expect(result).toStrictEqual(['Berlin']);
  });
  it('Get all storeNames', () => {
    const result = getAll(inputFixture, 'stores[*].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Get all storeNamesfrom object', () => {
    const result = getAll(testObject, 'stores[*].storeName');
    expect(result).toStrictEqual(['Berlin']);
  });
  it('Get from array if number 2', () => {
    const result = getAll(inputFixture, [{ string: 'stores' }, { number: 0 }, { string: 'storeName' }]);
    expect(result).toStrictEqual(['Berlin']);
  });
  it('Get not from array if number is string 1', () => {
    const result = getAll(inputFixture, 'stores["0"].storeName');
    expect(result).toStrictEqual([]);
  });
  it('Get not from array if number is string 2', () => {
    const result = getAll(inputFixture, [{ string: 'stores' }, { string: '0' }, { string: 'storeName' }]);
    expect(result).toStrictEqual([]);
  });
  it('Get not from object if number 1', () => {
    const result = getAll(testObject, 'stores[0].storeName');
    expect(result).toStrictEqual([]);
  });
  it('Get not from object if number 2', () => {
    const result = getAll(testObject, [{ string: 'stores' }, { number: 0 }, { string: 'storeName' }]);
    expect(result).toStrictEqual([]);
  });
  it('Get from object if number is string 1', () => {
    const result = getAll(testObject, 'stores["0"].storeName');
    expect(result).toStrictEqual(['Berlin']);
  });
  it('Get from object if number is string 2', () => {
    const result = getAll(testObject, [{ string: 'stores' }, { string: '0' }, { string: 'storeName' }]);
    expect(result).toStrictEqual(['Berlin']);
  });
  it('returns error if relative path is empty', () => {
    let errorMessage = null;
    try {
      getAll(testObject, 'stores[{$.}].storeName');
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Query element is invalid.');
  });
  it('returns error if absolute path is empty', () => {
    let errorMessage = null;
    try {
      getAll(testObject, 'stores[{$}].storeName');
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Query element is invalid.');
  });
  it('returns error if invalid path is given', () => {
    let errorMessage = null;
    try {
      getAll(testObject, undefined);
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Input path is invalid.');
  });
  it('Get all stores', () => {
    const result = getAll(inputFixture, 'stores[{1=1}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Get all stores with storeName in Berlin or Barcelona', () => {
    const result = getAll(inputFixture, `stores[{$.storeName ∈ $JSON(${JSON.stringify(['Berlin', 'Barcelona'])})}].storeName`);
    const result2 = getAll(inputFixture, `stores[{$.storeName @ $JSON(${JSON.stringify(['Berlin', 'Barcelona'])})}].storeName`);
    expect(result).toStrictEqual(['Berlin', 'Barcelona']);
    expect(result2).toStrictEqual(result);
  });
  it('Get all stores with storeName not in Berlin or Barcelona', () => {
    const result = getAll(inputFixture, `stores[{$.storeName ∉ $JSON(${JSON.stringify(['Berlin', 'Barcelona'])})}].storeName`);
    const result2 = getAll(inputFixture, `stores[{$.storeName !@ $JSON(${JSON.stringify(['Berlin', 'Barcelona'])})}].storeName`);
    expect(result).toStrictEqual(['Amsterdam', 'Rome']);
    expect(result2).toStrictEqual(result);
  });
  it('Get all stores with storeName not containing the letter B (capital sensitive)', () => {
    const result = getAll(inputFixture, 'stores[{B ∉ $.storeName}].storeName');
    const result2 = getAll(inputFixture, 'stores[{B !@ $.storeName}].storeName');
    expect(result).toStrictEqual(['Amsterdam', 'Rome']);
    expect(result2).toStrictEqual(result);
  });
  it('Get all stores with storeName containing the letter A (capital sensitive)', () => {
    const result = getAll(inputFixture, 'stores[{A ∈ $.storeName}].storeName');
    const result2 = getAll(inputFixture, 'stores[{A @ $.storeName}].storeName');
    expect(result).toStrictEqual(['Amsterdam']);
    expect(result2).toStrictEqual(result);
  });
  it('Get all stores with storeName containing the letter X (capital sensitive)', () => {
    const result = getAll(inputFixture, 'stores[{X ∈ $.storeName}].storeName');
    const result2 = getAll(inputFixture, 'stores[{X @ $.storeName}].storeName');
    expect(result).toStrictEqual([]);
    expect(result2).toStrictEqual(result);
  });
  it('Get all stores where expensive is null', () => {
    const result = getAll(inputFixture, 'stores[{$.expensive = null}].storeName');
    expect(result).toStrictEqual(['Rome']);
  });
  it('Get all storeswhere testSomethingUndefined is undefined', () => {
    const result = getAll(inputFixture, 'stores[{$.testSomethingUndefined = undefined}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Get all storeswhere expensive is not undefined', () => {
    const result = getAll(inputFixture, 'stores[{$.expensive != undefined}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Get all that have items where expensive is true', () => {
    const result = getAll(inputFixture, 'stores[{$.items[{$.expensive = true}]}].storeName');
    expect(result).toStrictEqual(['Amsterdam']);
  });
  it('Get all expensive items for all stores', () => {
    const result = getAll(inputFixture, 'stores[*].items[{$.price >= $..expensive}].name');
    expect(result).toStrictEqual(['Granny Smith medium bag', 'Granny Smith large bag', 'Pink Lady small bag', 'Pink Lady medium bag', 'Granny Smith large bag', 'Pink Lady medium bag', 'Pink Lady large bag']);
  });
  it('Get all expensive items for all something', () => {
    const result = getAll(inputFixture, '[*][*].items[{$.price >= $..expensive}].name');
    expect(result).toStrictEqual(['Granny Smith medium bag', 'Granny Smith large bag', 'Pink Lady small bag', 'Pink Lady medium bag', 'Granny Smith large bag', 'Pink Lady medium bag', 'Pink Lady large bag']);
  });
  it('Use of wildcard if there is nothing to retreive returns empty array', () => {
    const result = getAll(testObject, 'stores["0"].storeName[*]');
    expect(result).toStrictEqual([]);
  });
});
