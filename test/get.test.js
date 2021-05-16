/* eslint-disable no-undef */
const { get } = require('../index.js');
const inputFixture = require('./fixtures/inputFixture.json');

const testObject = {
  stores: {
    0: {
      storeName: 'Berlin',
    },
    $end: {
      storeName: 'Amsterdam',
    },
    test: {
      storeName: 'Barcelona',
      properties: {
        size: 100,
      },
    },
  },
};

describe('Test get function', () => {
  it('Get from array if number 1', () => {
    const result = get(inputFixture, 'stores[0].storeName');
    expect(result).toStrictEqual('Berlin');
  });
  it('Get from array from wildcard', () => {
    const result = get(inputFixture, 'stores[*].storeName');
    expect(result).toStrictEqual('Berlin');
  });
  it('Get from array if number 2', () => {
    const result = get(inputFixture, [{ string: 'stores' }, { number: 0 }, { string: 'storeName' }]);
    expect(result).toStrictEqual('Berlin');
  });
  it('Get not from array if number is string 1', () => {
    const result = get(inputFixture, 'stores["0"].storeName');
    expect(result).toStrictEqual(undefined);
  });
  it('Get not from array if number is string 2', () => {
    const result = get(inputFixture, [{ string: 'stores' }, { string: '0' }, { string: 'storeName' }]);
    expect(result).toStrictEqual(undefined);
  });
  it('Get not from object if number 1', () => {
    const result = get(testObject, 'stores[0].storeName');
    expect(result).toStrictEqual(undefined);
  });
  it('Get not from object if number 2', () => {
    const result = get(testObject, [{ string: 'stores' }, { number: 0 }, { string: 'storeName' }]);
    expect(result).toStrictEqual(undefined);
  });
  it('Get from object if number is string 1', () => {
    const result = get(testObject, 'stores["0"].storeName');
    expect(result).toStrictEqual('Berlin');
  });
  it('Get from object if number is string 2', () => {
    const result = get(testObject, [{ string: 'stores' }, { string: '0' }, { string: 'storeName' }]);
    expect(result).toStrictEqual('Berlin');
  });
  it('Attempt to get "$end" from object returns value', () => {
    const result = get(testObject, 'stores["$end"].storeName');
    expect(result).toStrictEqual('Amsterdam');
  });
  it('returns error if relative path is empty', () => {
    let errorMessage = null;
    try {
      get(testObject, 'stores[{$.}].storeName');
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Query element is invalid.');
  });
  it('returns error if absolute path is empty', () => {
    let errorMessage = null;
    try {
      get(testObject, 'stores[{$}].storeName');
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Query element is invalid.');
  });
  it('returns error if query is empty', () => {
    let errorMessage = null;
    try {
      get(testObject, 'stores[{}].storeName');
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Invalid query ');
  });
  it('returns error if invalid path is given', () => {
    let errorMessage = null;
    try {
      get(testObject, undefined);
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Input path is invalid.');
  });
  it('Testing relative path vs absolute path', () => {
    const result1 = get(inputFixture, 'stores[{$.storeName = $..mainStore}]');
    const result2 = get(inputFixture, 'stores[{$.storeName = $mainStore}]');
    expect(result1).toStrictEqual(result2);
  });
  it('Get non existing store', () => {
    const result = get(inputFixture, 'stores[{$.storeName = Dublin}].storeName');
    expect(result).toStrictEqual(undefined);
  });
  it('Get first store that is not Berlin', () => {
    const result = get(inputFixture, 'stores[{$.storeName != Berlin}].storeName');
    expect(result).toStrictEqual('Amsterdam');
  });
  it('Get end from non existing array', () => {
    const result = get({ test: {} }, 'test[{$end}]');
    expect(result).toStrictEqual(undefined);
  });
  it('Get end from empty array', () => {
    const result = get({ test: [] }, 'test[{$end}]');
    expect(result).toStrictEqual(undefined);
  });
  it('returns error if relative path is invalid', () => {
    let errorMessage = null;
    try {
      get(inputFixture, 'stores[{$...mainStore}].storeName');
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Relative depth (1+-2) of query is invalid.');
  });
  it('Get with query equal to object', () => {
    const result = get(testObject, `stores[{$.properties = $JSON(${JSON.stringify({ size: 100 })})}].storeName`);
    expect(result).toStrictEqual('Barcelona');
  });
  it('Get with query not equal to object', () => {
    const result = get(testObject, `stores[{$.properties = $JSON(${JSON.stringify({ size: 99 })})}].storeName`);
    expect(result).toStrictEqual(undefined);
  });
  it('Get an expensive items for a stores', () => {
    const result = get(inputFixture, 'stores[*].items[{$.price >= $..expensive}].name');
    expect(result).toStrictEqual('Granny Smith medium bag');
  });
  it('Get an expensive items for a something', () => {
    const result = get(inputFixture, '[*][*].items[{$.price >= $..expensive}].name');
    expect(result).toStrictEqual('Granny Smith medium bag');
  });
  it('Get an item that is cheaper than 3.50 for something', () => {
    const result = get(inputFixture, '[*][*].items[{$.price < 3.50}].name');
    expect(result).toStrictEqual('Granny Smith small bag');
  });
});
