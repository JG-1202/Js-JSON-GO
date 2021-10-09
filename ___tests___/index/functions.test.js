/* eslint-disable */
const JG = require('../../index');
const inputFixture = require('../fixtures/inputFixture.json');

describe('Test getAll function with functions', () => {
  const basicSettings = {
    unlinkInputObject: true,
  };
  const basicFunctions = {
    storeNameBerlin: (element) => {
      if (element.storeName === 'Berlin') {
        return true;
      }
      return false;
    },
    priceIsFiveOrSix: (element) => {
      if (element.price === 5 || element.price === 6) {
        return true;
      }
      return false;
    },
    priceCheck: (element) => {
      if (element.price > 5) {
        return true;
      }
      return false;
    },
  };
  it('Testing basic functions getAll', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    const result = JsonGo.getAll('stores[{$Function(storeNameBerlin)}].items[{$Function(priceIsFiveOrSix)}].name');
    expect(result).toStrictEqual(['Granny Smith medium bag', 'Granny Smith large bag']);
  });
  it('Testing basic functions findAll', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    const result = JsonGo.findAll('stores[{$Function(storeNameBerlin)}].items[{$Function(priceIsFiveOrSix)}].name');
    expect(result).toStrictEqual([{ path: 'stores[0].items[1].name', value: 'Granny Smith medium bag' }, { path: 'stores[0].items[2].name', value: 'Granny Smith large bag' }]);
  });
  it('Testing basic functions getPaths', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    const result = JsonGo.getPaths('stores[{$Function(storeNameBerlin)}].items[{$Function(priceIsFiveOrSix)}].name');
    expect(result).toStrictEqual(['stores[0].items[1].name', 'stores[0].items[2].name']);
  });
  it('Non-existing function returns false', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    const result = JsonGo.getAll('stores[{$Function(unkownFunctionName)}]');
    expect(result).toStrictEqual([]);
  });
  it('Testing with local function definition', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    const functions = {
      storeNameNotBerlin: (element) => {
        if (element.storeName !== 'Berlin') {
          return true;
        }
        return false;
      },
    };
    const result = JsonGo.getAll('stores[{$Function(storeNameNotBerlin)}].storeName', functions);
    expect(result).toStrictEqual(['Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Testing with local and global function definition', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    const functions = {
      storeNameNotBerlin: (element) => {
        if (element.storeName !== 'Berlin') {
          return true;
        }
        return false;
      },
    };
    const result = JsonGo.getAll('stores[{$Function(storeNameNotBerlin)}].items[{$Function(priceCheck)}].price', functions);
    expect(result).toStrictEqual([6, 8, 10]);
  });
  it('Testing with local function definition, same function name throws error', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    let errorMessage = null;
    const functions = {
      storeNameNotBerlin: (element) => {
        if (element.storeName !== 'Berlin') {
          return true;
        }
        return false;
      },
      priceCheck: (element) => {
        if (element.price > 8) {
          return true;
        }
        return false;
      },
    };
    try {
      JsonGo.getAll('stores[{$Function(storeNameNotBerlin)}].items[{$Function(priceCheck)}].price', functions);
    } catch (err) {
      errorMessage = err.message;
    }
    expect(errorMessage).toStrictEqual('Conflicting function name priceCheck.');
  });
  it('Testing function cache, local function does not exist in next query', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    const functions = {
      storeNameNotBerlin: (element) => {
        if (element.storeName !== 'Berlin') {
          return true;
        }
        return false;
      },
    };
    const results = [];
    results.push(JsonGo.getAll('stores[{$Function(storeNameNotBerlin)}].items[{$Function(priceCheck)}].price', functions));
    results.push(JsonGo.getAll('stores[{$Function(storeNameNotBerlin)}].items[{$Function(priceCheck)}].price'));
    expect(results).toStrictEqual([[6, 8, 10], []]);
  });
  it('Testing function cache, functions still available for query-in-query', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    const functions = {
      storeNameAmsterdam: (element) => {
        if (element.storeName === 'Amsterdam') {
          return true;
        }
        return false;
      },
    };
    const result = JsonGo.getAll('stores[{$Function(storeNameAmsterdam)}].items[{$.price >= $stores[{$Function(storeNameAmsterdam)}].expensive}].name', functions);
    expect(result).toStrictEqual(['Granny Smith large bag', 'Pink Lady medium bag', 'Pink Lady large bag']);
  });
  it('Testing functions for get', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    const result = JsonGo.get('stores[{$Function(storeNameBerlin)}].storeName');
    expect(result).toStrictEqual('Berlin');
  });
  it('Testing functions for getPath', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    const result = JsonGo.getPath('stores[{$Function(storeNameBerlin)}].storeName');
    expect(result).toStrictEqual('stores[0].storeName');
  });
  it('Testing functions for find', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    const result = JsonGo.find('stores[{$Function(storeNameBerlin)}].storeName');
    expect(result).toStrictEqual({ value: 'Berlin', path: 'stores[0].storeName' });
  });
  it('Testing functions for set', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    JsonGo.set('stores[{$Function(storeNameBerlin)}].storeName', 'BERLIN');
    expect(JsonGo.get('stores[0].storeName')).toStrictEqual('BERLIN');
  });
  it('Testing functions for setAll', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    JsonGo.setAll('stores[{$Function(storeNameBerlin)}].storeName', 'BerlIn');
    expect(JsonGo.get('stores[0].storeName')).toStrictEqual('BerlIn');
  });
});
