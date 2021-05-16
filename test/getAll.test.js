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
  it('Get all storeNames with a storeName', () => {
    const result = getAll(inputFixture, 'stores[{$.storeName}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
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

describe('Testing JSON equality', () => {
  it('Get stores that sells exactely the same items as the store from query', () => {
    const itemsFromAmsterdam = inputFixture.stores[1].items;
    const result = getAll(inputFixture, `stores[{$.items = $JSON(${JSON.stringify(itemsFromAmsterdam)})}].storeName`);
    expect(result).toStrictEqual(['Amsterdam']);
  });
  it('Testing equality of arrays', () => {
    const input = [{ test: [1, 2, 3] }];
    const result = getAll(input, `[{$.test = $JSON(${JSON.stringify([1, 2, 3])})}].test`);
    expect(result).toStrictEqual([[1, 2, 3]]);
  });
  it('Testing inequality of arrays', () => {
    const input = [{ test: [2, 1, 3] }];
    const result = getAll(input, `[{$.test = $JSON(${JSON.stringify([1, 2, 3])})}].test`);
    expect(result).toStrictEqual([]);
  });
  it('Testing equality of objects', () => {
    const input = [{ test: { a: true, b: true, c: true } }];
    const result = getAll(input, `[{$.test = $JSON(${JSON.stringify({ b: true, a: true, c: true })})}].test`);
    expect(result).toStrictEqual([{ a: true, b: true, c: true }]);
  });
  it('Testing inequality of objects', () => {
    const input = [{ test: { a: true, b: true, c: true } }];
    const result = getAll(input, `[{$.test = $JSON(${JSON.stringify({ b: true, a: false, c: true })})}].test`);
    expect(result).toStrictEqual([]);
  });
});

describe('Test getAll function with regular expressions', () => {
  it('Testing basic regular expression', () => {
    const result = getAll(inputFixture, 'stores[{$.storeName ? $RegExp(/\\w+/)}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Testing regular expression without flags', () => {
    const result = getAll(inputFixture, 'stores[{$.storeName ? $RegExp(/.*AMS.*/)}].storeName');
    expect(result).toStrictEqual([]);
  });
  it('Testing regular expression with flags', () => {
    const result = getAll(inputFixture, 'stores[{$.storeName ? $RegExp(/.*AMS.*/i)}].storeName');
    expect(result).toStrictEqual(['Amsterdam']);
  });
  it('Testing regular expression with flags as first part of query', () => {
    const result = getAll(inputFixture, 'stores[{$RegExp(/.*AMS.*/i) ? $.storeName}].storeName');
    expect(result).toStrictEqual(['Amsterdam']);
  });
  it('If operator is ? but no RegExp is found, return no results', () => {
    const result = getAll(inputFixture, 'stores[{$.storeName ? $.storeName}].storeName');
    expect(result).toStrictEqual([]);
  });
  it('If invalid regular expression, throw error', () => {
    let result = null;
    try {
      getAll(inputFixture, 'stores[{$.storeName ? $RegExp(\\w+)}].storeName');
    } catch (err) {
      result = err.message;
    }
    expect(result).toStrictEqual('Invalid regular expression, missing / at beginning and beteen pattern and flags, or flags are invalid. (Don\'t forget to escape special chars.)');
  });
});
