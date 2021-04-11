/* eslint-disable no-undef */
const JG = require('../index');
const inputFixture = require('./fixtures/inputFixture.json');
const inputFixtureObject = require('./fixtures/inputFixtureObject.json');

describe('Test getting a value', () => {
  it('Export json', () => {
    const JsonGo = new JG.Json(inputFixture);
    expect(JsonGo.export()).toStrictEqual(inputFixture);
  });
  it('Get last store in list', () => {
    const JsonGo = new JG.Json(inputFixture);
    expect(JsonGo.get('stores[{$end}].storeName')).toStrictEqual('Rome');
  });
  it('Get all stores in list', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.getAll('stores[{$.storeName}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam', 'Barcelona', 'Rome']);
  });
  it('Get all stores that have items for sale', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.getAll('stores[{$.items[{$.name}]}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam', 'Barcelona']);
  });
  it('Get all stores that have Pink Lady for sale', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.getAll('stores[{$.items[{$.family = \'Pink Lady\'}]}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam']);
  });
  it('Get all stores that have Granny\'s for sale', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.getAll('stores[{$.items[{$.family = "Granny\'s"}]}].storeName');
    expect(result).toStrictEqual(['Berlin', 'Amsterdam', 'Barcelona']);
  });
  it('Get first expensive item from Amsterdam', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.get('stores[{$.storeName = Amsterdam}].items[{$.price >= $stores[{$.storeName = Amsterdam}].expensive}].name');
    expect(result).toStrictEqual('Granny Smith large bag');
  });
  it('Get all expensive items from Amsterdam', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.getAll('stores[{$.storeName = Amsterdam}].items[{$.price >= $stores[{$.storeName = Amsterdam}].expensive}].name');
    expect(result).toStrictEqual(['Granny Smith large bag', 'Pink Lady medium bag', 'Pink Lady large bag']);
  });
  it('Get all expensive items from main store', () => {
    const JsonGo = new JG.Json(inputFixture);
    const result = JsonGo.getAll('stores[{$.storeName = $mainStore}].items[{$.price >= $stores[{$.storeName = $mainStore}].expensive}].name');
    expect(result).toStrictEqual(['Granny Smith large bag', 'Pink Lady medium bag', 'Pink Lady large bag']);
  });
  it('Get all objects that have a large expensive bag', () => {
    const JsonGo = new JG.Json(inputFixtureObject);
    const result = JsonGo.getAll('itemFamilies[{$.large.price > $expensive}]');
    expect(result).toStrictEqual([inputFixtureObject.itemFamilies.Fuji]);
  });
  it('Get all objects of which the price of a small bag is lower than or equal to 1', () => {
    const JsonGo = new JG.Json(inputFixtureObject);
    const result = JsonGo.getAll('itemFamilies[{$.small.price <= 1}]');
    expect(result).toStrictEqual([inputFixtureObject.itemFamilies["Granny's"]]);
  });
});

describe('Test setting values', () => {
  it('Set element at end of array with $end', () => {
    const JsonGo = new JG.Json({});
    JsonGo.set('test', [{ x: 0 }, { x: 2 }]);
    JsonGo.set('test[{$end}].t', 1);
    const result = JsonGo.export();
    expect(result).toStrictEqual({ test: [{ x: 0 }, { x: 2, t: 1 }] });
  });
  it('Append element to array', () => {
    const JsonGo = new JG.Json([]);
    JsonGo.set('[{$append}]', true);
    const result = JsonGo.export();
    expect(result).toStrictEqual([true]);
  });
  it('Set element at end of array with $end when it is not an arry results in error by default', () => {
    let errorMessage = null;
    try {
      const JsonGo = new JG.Json(undefined, { fatalErrorOnCreate: true });
      JsonGo.set('test', {});
      JsonGo.set('test[{$end}]', true);
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toBe('No results found for provided query [{"custom":"end"}].');
  });
  it('Set element at end of array with $end when it is not an arry results not in error based on settings', () => {
    const JsonGo = new JG.Json({}, { fatalErrorOnCreate: false });
    JsonGo.set('test', {});
    JsonGo.set('test2', {});
    JsonGo.setAll('test[{$end}]', true);
    JsonGo.set('test2[{$end}]', true);
    const result = JsonGo.export();
    expect(result).toStrictEqual({ test: {}, test2: {} });
  });
  it('Test creating inputFixture', () => {
    const JsonGo = new JG.Json({}, { fatalErrorOnCreate: false });
    JsonGo.set('holding', 'appleCompany');
    JsonGo.set('mainStore', 'Amsterdam');
    JsonGo.set('stores[0].storeName', 'Berlin');
    JsonGo.set('stores[{$end}].expensive', 5);
    JsonGo.set('stores[{$end}].items', inputFixture.stores[0].items);
    JsonGo.set('stores[{$append}].storeName', 'Amsterdam');
    JsonGo.set('stores[{$.storeName = $mainStore}].expensive', 6);
    JsonGo.set('stores[{$append}].storeName', 'Barcelona');
    JsonGo.set('stores[{$end}].expensive', 4.50);
    JsonGo.set('stores[{$end}].items[1].name', 'Granny Smith medium bag');
    JsonGo.set('stores[{$end}].items[1].weight', 2);
    JsonGo.set('stores[{$end}].items[1].price', 2);
    JsonGo.set('stores[{$end}].items[{$append}].name', 'Granny Smith large bag');
    JsonGo.set('stores[{$end}].items[{$end}].weight', 3);
    JsonGo.set('stores[{$end}].items[{$end}].price', 3);
    JsonGo.set('stores[{$end}].items[0].name', 'Granny Smith small bag');
    JsonGo.set('stores[{$end}].items[0].weight', 1);
    JsonGo.set('stores[{$end}].items[0].price', 1);
    JsonGo.setAll('stores[{$end}].items[{$.name}].family', "Granny's");
    JsonGo.setAll('stores[{$append}]', {
      storeName: 'Rome',
      items: [],
    });
    JsonGo.setAll('stores[{$.storeName = Rome}].expensive', null);
    JsonGo.setAll('stores[{$.storeName = $mainStore}].items', inputFixture.stores[1].items);
    JsonGo.setAll('stores[{$.storeName = $mainStore}].items[{$.price >= $stores[{$.storeName = $mainStore}].expensive}].expensive', true);
    const result = JsonGo.export();
    expect(result).toStrictEqual(inputFixture);
  });
  it('Test creating inputFixture generates error by default on setAll because query not found', () => {
    let errorMessage = null;
    try {
      const JsonGo = new JG.Json({}, { fatalErrorOnCreate: true });
      JsonGo.set('holding', 'appleCompany');
      JsonGo.set('mainStore', 'Amsterdam');
      JsonGo.set('stores[0].storeName', 'Berlin');
      JsonGo.set('stores[{$end}].expensive', 5);
      JsonGo.set('stores[{$end}].items', inputFixture.stores[0].items);
      JsonGo.setAll('stores[{$expensive > 100}].items', []); // non-existent test
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toBe('No results found for provided query [{"absolutePath":"expensive"},{"value":">"},{"value":100}].');
  });
  it('Test creating inputFixture generates error by default on set because query not found', () => {
    let errorMessage = null;
    try {
      const JsonGo = new JG.Json({}, { fatalErrorOnCreate: true });
      JsonGo.set('holding', 'appleCompany');
      JsonGo.set('mainStore', 'Amsterdam');
      JsonGo.set('stores[0].storeName', 'Berlin');
      JsonGo.set('stores[{$end}].expensive', 5);
      JsonGo.set('stores[{$end}].items', inputFixture.stores[0].items);
      JsonGo.set('stores[{$.expensive > 99}].items', []); // non-existent test
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toBe('No results found for provided query [{"relativePath":"expensive","relativeDepth":0},{"value":">"},{"value":99}].');
  });
});

describe('Mapping', () => {
  it('Map to new object', () => {
    const JsonGo = new JG.Map(inputFixture, {});
    JsonGo.translate('mainStore', 'test[2].store');
    const result = JsonGo.export();
    expect(result).toEqual({ test: [undefined, undefined, { store: 'Amsterdam' }] });
  });
  it('Map to new array', () => {
    const JsonGo = new JG.Map(inputFixture, []);
    JsonGo.translate('mainStore', '[0].test[2].store');
    const result = JsonGo.export();
    expect(result).toEqual([{ test: [undefined, undefined, { store: 'Amsterdam' }] }]);
  });
  it('Map items of main store to new object', () => {
    const JsonGo = new JG.Map(inputFixture, {});
    JsonGo.translateAll('stores[{$.storeName = Amsterdam}].items[{$.price >= $stores[{$.storeName = Amsterdam}].expensive}].name', 'stores[{$append}].expensiveItems');
    JsonGo.translateAll('stores[{$.storeName = Amsterdam}].items[{$.price < $stores[{$.storeName = Amsterdam}].expensive}].name', 'stores[{$end}].nonExpensiveItems');
    const result = JsonGo.export();
    expect(result).toEqual({ stores: [{ expensiveItems: ['Granny Smith large bag', 'Pink Lady medium bag', 'Pink Lady large bag'], nonExpensiveItems: ['Granny Smith small bag', 'Granny Smith medium bag'] }] });
  });
  it('Map one item into all', () => {
    const startingObject = { test: true };
    const start = { array: [startingObject, startingObject, { test: false }, startingObject] };
    const JsonGo = new JG.Map(inputFixture, start);
    JsonGo.translateOneToAll('stores[{$.storeName = Amsterdam}].expensive', 'array[{$.test}].expensive');
    const result = JsonGo.export();
    const checkObject = { test: true, expensive: 6 };
    expect(result).toEqual({ array: [checkObject, checkObject, { test: false }, checkObject] });
  });
  it('Map all items into one', () => {
    const startingObject = { test: true };
    const start = { array: [startingObject, startingObject, { test: false }, startingObject] };
    const JsonGo = new JG.Map(inputFixture, start);
    JsonGo.translateAllToOne('stores[{$.expensive}].expensive', 'array[{$.test}].expensive');
    const result = JsonGo.export();
    const checkObject = { test: true, expensive: [5, 6, 4.5] };
    expect(result).toEqual({
      array: [checkObject, startingObject, { test: false }, startingObject],
    });
  });
});

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
  it('Testing basic functions', () => {
    const JsonGo = new JG.Json(inputFixture, basicSettings, basicFunctions);
    const result = JsonGo.getAll('stores[{$Function(storeNameBerlin)}].items[{$Function(priceIsFiveOrSix)}].name');
    expect(result).toStrictEqual(['Granny Smith medium bag', 'Granny Smith large bag']);
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

describe('Testing different settings', () => {
  it('defaultGetResponse', () => {
    const JsonGo = new JG.Json(inputFixture, { defaultGetResponse: 'default' });
    const result = JsonGo.get('nonExisting');
    expect(result).toStrictEqual('default');
  });
  it('defaultGetAllResponse', () => {
    const JsonGo = new JG.Json(inputFixture, { defaultGetAllResponse: '' });
    const result = JsonGo.getAll('nonExisting');
    expect(result).toStrictEqual('');
  });
  it('unlinkInputObject default', () => {
    const testObject = {
      test: true,
    };
    const JsonGo = new JG.Json(testObject, { });
    JsonGo.set('test2', true);
    expect(testObject).toStrictEqual({ test: true, test2: true });
  });
  it('unlinkInputObject true', () => {
    const testObject = {
      test: true,
    };
    const JsonGo = new JG.Json(testObject, { unlinkInputObject: true });
    JsonGo.set('test2', true);
    expect(testObject).toStrictEqual({ test: true });
  });
});
