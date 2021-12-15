/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

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
  it('Get all storeNames with references', () => {
    const expectedReferences = [
      { first: 'stores', store: 0 },
      { first: 'stores', store: 1 },
      { first: 'stores', store: 2 },
      { first: 'stores', store: 3 },
    ];
    test(inputFixture, '[stores:(first)][{*}:(store)].storeName', ['Berlin', 'Amsterdam', 'Barcelona', 'Rome'], expectedReferences);
  });
  it('Get first item name from every store', () => {
    test(inputFixture, 'stores[*].items[0].name', ['Granny Smith small bag', 'Granny Smith small bag', 'Granny Smith small bag']);
  });
  it('Get all storeNames with a storeName', () => {
    test(inputFixture, 'stores[{$.storeName}].storeName', ['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
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
  it('Testing relative path with multiple outputs', () => {
    test(inputFixture, 'stores[{$.storeName != $..mainStore}].storeName', ['Berlin', 'Barcelona', 'Rome']);
  });
});
