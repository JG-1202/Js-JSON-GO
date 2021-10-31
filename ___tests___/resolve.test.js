/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const test = require('./testers/resolve/test');
const testError = require('./testers/resolve/testError');
const inputFixture = require('./fixtures/inputFixture.json');
const testObject = require('./fixtures/resolve/testObject.json');

describe('Test get function', () => {
  it('Get from array if number 1', () => {
    test(inputFixture, 'stores[0].storeName', 'Berlin');
  });
  it('Get from array from wildcard', () => {
    test(inputFixture, 'stores[*].storeName', 'Berlin');
  });
  it('Get from array if number 2', () => {
    test(inputFixture, [{ string: 'stores' }, { number: 0 }, { string: 'storeName' }], 'Berlin');
  });
  it('Get not from array if number is string 1', () => {
    test(inputFixture, 'stores["0"].storeName', undefined);
  });
  it('Get not from array if number is string 2', () => {
    test(inputFixture, [{ string: 'stores' }, { string: '0' }, { string: 'storeName' }], undefined);
  });
  it('Get not from object if number 1', () => {
    test(testObject, 'stores[0].storeName', undefined);
  });
  it('Get not from object if number 2', () => {
    test(testObject, [{ string: 'stores' }, { number: 0 }, { string: 'storeName' }], undefined);
  });
  it('Get from object if number is string 1', () => {
    test(testObject, 'stores["0"].storeName', 'Berlin');
  });
  it('Get from object if number is string 2', () => {
    test(testObject, [{ string: 'stores' }, { string: '0' }, { string: 'storeName' }], 'Berlin');
  });
  it('Attempt to get "$end" from object returns value', () => {
    test(testObject, 'stores["$end"].storeName', 'Amsterdam');
  });
  it('returns error if relative path is empty', () => {
    testError(testObject, 'stores[{$.}].storeName', 'Query element is invalid.');
  });
  it('returns error if absolute path is empty', () => {
    testError(testObject, 'stores[{$}].storeName', 'Query element is invalid.');
  });
  it('returns error if query is empty', () => {
    testError(testObject, 'stores[{}].storeName', 'Invalid query ');
  });
  it('returns error if invalid path is given', () => {
    testError(testObject, undefined, 'Input path is invalid.');
  });
  it('Testing relative path vs absolute path', () => {
    test(inputFixture, 'stores[{$.storeName = $..mainStore}]', inputFixture.stores[1]);
    test(inputFixture, 'stores[{$.storeName = $mainStore}]', inputFixture.stores[1]);
  });
  it('Get non existing store', () => {
    test(inputFixture, 'stores[{$.storeName = Dublin}].storeName', undefined);
  });
  it('Get first store that is not Berlin', () => {
    test(inputFixture, 'stores[{$.storeName != Berlin}].storeName', 'Amsterdam');
  });
  it('Resolving reference', () => {
    test(inputFixture, '[stores:(first)][{$.storeName != Berlin}:(store)].storeName', 'Amsterdam', { first: 'stores', store: 1 });
  });
  it('Get end from non existing array', () => {
    test({ test: {} }, 'test[{$end}]', undefined);
  });
  it('Get end from empty array', () => {
    test({ test: [] }, 'test[{$end}]', undefined);
  });
  it('returns error if relative path is invalid', () => {
    testError(inputFixture, 'stores[{$...mainStore}].storeName', 'Relative depth (1+-2) of query is invalid.');
  });
  it('Get with query equal to object', () => {
    test(testObject, `stores[{$.properties = $JSON(${JSON.stringify({ size: 100 })})}].storeName`, 'Barcelona');
  });
  it('Get with query not equal to object', () => {
    test(testObject, `stores[{$.properties = $JSON(${JSON.stringify({ size: 99 })})}].storeName`, undefined);
  });
  it('Get an expensive items for a stores', () => {
    test(inputFixture, 'stores[*].items[{$.price >= $..expensive}].name', 'Granny Smith medium bag');
  });
  it('Get an expensive items for a something', () => {
    test(inputFixture, '[*][*].items[{$.price >= $..expensive}].name', 'Granny Smith medium bag');
  });
  it('Get an item that is cheaper than 3.50 for something', () => {
    test(inputFixture, '[*][*].items[{$.price < 3.50}].name', 'Granny Smith small bag');
  });
});
