/* eslint-disable no-undef */
const JG = require('../../index');
const inputFixture = require('../fixtures/inputFixture.json');

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
