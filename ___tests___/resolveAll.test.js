/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const JG = require('../index');
const test = require('./testers/resolveAll/test');
const testError = require('./testers/resolveAll/testError');
const inputFixture = require('./fixtures/inputFixture.json');
const testObject = require('./fixtures/resolveAll/testObject.json');

describe('Test getAll function', () => {
  it('Simple path', () => {
    test(inputFixture, 'stores[0].storeName', ['Berlin']);
  });
  it('Simple non-existing path', () => {
    test(inputFixture, 'stores[99].storeName', []);
  });
  it('Get all storeNames', () => {
    test(inputFixture, 'stores[*].storeName', ['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Get first item name from every store', () => {
    test(inputFixture, 'stores[*].items[0].name', ['Granny Smith small bag', 'Granny Smith small bag', 'Granny Smith small bag']);
  });
  it('Get all storeNames from object', () => {
    test(testObject, 'stores[*].storeName', ['Berlin']);
  });
  it('Get all storeNames with a storeName', () => {
    test(inputFixture, 'stores[{$.storeName}].storeName', ['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Get from array if number 2', () => {
    test(inputFixture, [{ string: 'stores' }, { number: 0 }, { string: 'storeName' }], ['Berlin']);
  });
  it('Get not from array if number is string 1', () => {
    test(inputFixture, 'stores["0"].storeName', []);
  });
  it('Get not from array if number is string 2', () => {
    test(inputFixture, [{ string: 'stores' }, { string: '0' }, { string: 'storeName' }], []);
  });
  it('Get not from object if number 1', () => {
    test(testObject, 'stores[0].storeName', []);
  });
  it('Get not from object if number 2', () => {
    test(testObject, [{ string: 'stores' }, { number: 0 }, { string: 'storeName' }], []);
  });
  it('Get from object if number is string 1', () => {
    test(testObject, 'stores["0"].storeName', ['Berlin']);
  });
  it('Get from object if number is string 2', () => {
    test(testObject, [{ string: 'stores' }, { string: '0' }, { string: 'storeName' }], ['Berlin']);
  });
  it('returns error if relative path is empty', () => {
    testError(testObject, 'stores[{$.}].storeName', 'Query element is invalid.');
  });
  it('returns error if absolute path is empty', () => {
    testError(testObject, 'stores[{$}].storeName', 'Query element is invalid.');
  });
  it('returns error if invalid path is given', () => {
    testError(testObject, undefined, 'Input path is invalid.');
  });
  it('Get all stores', () => {
    test(inputFixture, 'stores[{1=1}].storeName', ['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Get all stores with storeName in Berlin or Barcelona', () => {
    test(inputFixture, `stores[{$.storeName ∈ $JSON(${JSON.stringify(['Berlin', 'Barcelona'])})}].storeName`, ['Berlin', 'Barcelona']);
    test(inputFixture, `stores[{$.storeName @ $JSON(${JSON.stringify(['Berlin', 'Barcelona'])})}].storeName`, ['Berlin', 'Barcelona']);
  });
  it('Get all stores with storeName not in Berlin or Barcelona', () => {
    test(inputFixture, `stores[{$.storeName ∉ $JSON(${JSON.stringify(['Berlin', 'Barcelona'])})}].storeName`, ['Amsterdam', 'Rome']);
    test(inputFixture, `stores[{$.storeName !@ $JSON(${JSON.stringify(['Berlin', 'Barcelona'])})}].storeName`, ['Amsterdam', 'Rome']);
  });
  it('Get all stores with storeName not containing the letter B (capital sensitive)', () => {
    test(inputFixture, 'stores[{B ∉ $.storeName}].storeName', ['Amsterdam', 'Rome']);
    test(inputFixture, 'stores[{B !@ $.storeName}].storeName', ['Amsterdam', 'Rome']);
  });
  it('Get all stores with storeName containing the letter A (capital sensitive)', () => {
    test(inputFixture, 'stores[{A ∈ $.storeName}].storeName', ['Amsterdam']);
    test(inputFixture, 'stores[{A @ $.storeName}].storeName', ['Amsterdam']);
  });
  it('Get all stores with storeName containing the letter X (capital sensitive)', () => {
    test(inputFixture, 'stores[{X ∈ $.storeName}].storeName', []);
    test(inputFixture, 'stores[{X @ $.storeName}].storeName', []);
  });
  it('Get all stores where expensive is null', () => {
    test(inputFixture, 'stores[{$.expensive = null}].storeName', ['Rome']);
  });
  it('Get all stores where expensive is "null"', () => {
    test(inputFixture, 'stores[{$.expensive = "null"}].storeName', []);
  });
  it('Get all stores where testSomethingUndefined is undefined', () => {
    test(inputFixture, 'stores[{$.testSomethingUndefined = undefined}].storeName', ['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Get all stores where expensive is not undefined', () => {
    test(inputFixture, 'stores[{$.expensive != undefined}].storeName', ['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Get all that have items where expensive is true', () => {
    test(inputFixture, 'stores[{$.items[{$.expensive = true}]}].storeName', ['Amsterdam']);
  });
  it('Get all expensive items for all stores', () => {
    test(inputFixture, 'stores[*].items[{$.price >= $..expensive}].name', ['Granny Smith medium bag', 'Granny Smith large bag', 'Pink Lady small bag', 'Pink Lady medium bag', 'Granny Smith large bag', 'Pink Lady medium bag', 'Pink Lady large bag']);
  });
  it('Get all expensive items for all something', () => {
    test(inputFixture, '[*][*].items[{$.price >= $..expensive}].name', ['Granny Smith medium bag', 'Granny Smith large bag', 'Pink Lady small bag', 'Pink Lady medium bag', 'Granny Smith large bag', 'Pink Lady medium bag', 'Pink Lady large bag']);
  });
  it('Use of wildcard if there is nothing to retrieve returns empty array', () => {
    test(testObject, 'stores["0"].storeName[*]', []);
  });
});

describe('Testing JSON equality', () => {
  it('Get stores that sells exactly the same items as the store from query', () => {
    const itemsFromAmsterdam = JSON.stringify(inputFixture.stores[1].items);
    test(inputFixture, `stores[{$.items = $JSON(${itemsFromAmsterdam})}].storeName`, ['Amsterdam']);
  });
  it('Testing equality', () => {
    const input = [{ test: [1, 2, 3] }];
    test(input, `[{$.test = $JSON(${JSON.stringify([1, 2, 3])})}].test`, [[1, 2, 3]]);
  });
  it('Testing equality of arrays', () => {
    const input = [{ test: [1, 2, 3] }];
    test(input, `[{$.test = $JSON(${JSON.stringify([1, 2, 3])})}].test`, [[1, 2, 3]]);
  });
  it('Testing inequality of arrays', () => {
    const input = [{ test: [2, 1, 3] }];
    test(input, `[{$.test = $JSON(${JSON.stringify([1, 2, 3])})}].test`, []);
  });
  it('Testing inequality of arrays 2', () => {
    const input = [{ test: [1, 2, 3, 4] }];
    test(input, `[{$.test = $JSON(${JSON.stringify([1, 2, 3])})}].test`, []);
  });
  it('Testing inequality of arrays 3', () => {
    const input = [{ test: [1, 2, 3] }];
    test(input, `[{$.test = $JSON(${JSON.stringify([1, 2, 3, 4])})}].test`, []);
  });
  it('Testing equality of objects', () => {
    const input = [{ test: { a: true, b: true, c: true } }];
    test(input, `[{$.test = $JSON(${JSON.stringify({ b: true, a: true, c: true })})}].test`, [{ a: true, b: true, c: true }]);
  });
  it('Testing inequality of objects', () => {
    const input = [{ test: { a: true, b: true, c: true } }];
    test(input, `[{$.test = $JSON(${JSON.stringify({ b: true, a: false, c: true })})}].test`, []);
  });
  it('Testing inequality of objects 2', () => {
    const input = [{
      test: {
        a: true, b: true, c: true, d: true,
      },
    }];
    test(input, `[{$.test = $JSON(${JSON.stringify({ b: true, a: false, c: true })})}].test`, []);
  });
  it('Testing inequality of objects 3', () => {
    const input = [{ test: { a: true, b: true, c: true } }];
    test(input, `[{$.test = $JSON(${JSON.stringify({
      b: true, a: true, c: true, d: true,
    })})}].test`, []);
  });
});

describe('Test getAll function with regular expressions', () => {
  it('Testing basic regular expression', () => {
    test(inputFixture, 'stores[{$.storeName ? $RegExp(/\\w+/)}].storeName', ['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Testing regular expression without flags', () => {
    test(inputFixture, 'stores[{$.storeName ? $RegExp(/.*AMS.*/)}].storeName', []);
  });
  it('Testing regular expression with flags', () => {
    test(inputFixture, 'stores[{$.storeName ? $RegExp(/.*AMS.*/i)}].storeName', ['Amsterdam']);
  });
  it('Testing regular expression with flags, as first part of query', () => {
    test(inputFixture, 'stores[{$RegExp(/.*AMS.*/i) ? $.storeName}].storeName', ['Amsterdam']);
  });
  it('If operator is ? but no RegExp is found, return no results', () => {
    test(inputFixture, 'stores[{$.storeName ? $.storeName}].storeName', []);
  });
  it('If invalid regular expression, throw error', () => {
    testError(inputFixture, 'stores[{$.storeName ? $RegExp(\\w+)}].storeName', 'Invalid regular expression, missing / at beginning and between pattern and flags, or flags are invalid. (Don\'t forget to escape special chars.)');
  });
});

describe('Settings do not affect outcome', () => {
  it('defaultGetResponse', () => {
    const result = JG.getAll(inputFixture, 'stores[{$.items[{$.name = "Pink Lady large bag"}]}].storeName', undefined, { defaultGetResponse: 'test' });
    expect(result).toStrictEqual(['Amsterdam']);
    const result2 = JG.getAll(inputFixture, 'stores[*].items[{$.price >= $..expensive}].name', undefined, { defaultGetResponse: 'test' });
    expect(result2).toStrictEqual(['Granny Smith medium bag', 'Granny Smith large bag', 'Pink Lady small bag', 'Pink Lady medium bag', 'Granny Smith large bag', 'Pink Lady medium bag', 'Pink Lady large bag']);
  });
  it('defaultGetAllResponse', () => {
    const result = JG.getAll(inputFixture, 'stores[{$.items[{$.name = "Pink Lady large bag"}]}].storeName', undefined, { defaultGetAllResponse: [{ value: 'test', path: 'testPath' }] });
    expect(result).toStrictEqual(['Amsterdam']);
    const result2 = JG.getAll(inputFixture, 'stores[*].items[{$.price >= $..expensive}].name', undefined, { defaultGetAllResponse: [{ value: 'test', path: 'testPath' }] });
    expect(result2).toStrictEqual(['Granny Smith medium bag', 'Granny Smith large bag', 'Pink Lady small bag', 'Pink Lady medium bag', 'Granny Smith large bag', 'Pink Lady medium bag', 'Pink Lady large bag']);
  });
});
