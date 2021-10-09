/* eslint-disable no-undef */
const JG = require('../../index');
const inputFixture = require('../fixtures/inputFixture.json');

describe('Test setting value(s)', () => {
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
