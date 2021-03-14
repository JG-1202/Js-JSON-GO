/* eslint-disable no-undef */
const transform = require('../src/helpers/pathTransformer');

describe('Test getting a value', () => {
  it('Simple path with array', () => {
    const result = transform('stores[0].storeName');
    expect(result).toStrictEqual([{ string: 'stores' }, { number: 0 }, { string: 'storeName' }]);
  });
  it('Transform with already transformed path equals transformed path', () => {
    const result = transform([{ string: 'stores' }, { number: 0 }, { string: 'storeName' }]);
    expect(result).toStrictEqual([{ string: 'stores' }, { number: 0 }, { string: 'storeName' }]);
  });
  it('Simple path with number as string', () => {
    const result = transform('stores["0"].storeName');
    expect(result).toStrictEqual([{ string: 'stores' }, { string: '0' }, { string: 'storeName' }]);
  });
  it('Brackets and quotes are ignored if it is a string', () => {
    const result = transform('stores["{{{\'}"].storeName[\'"[[]]\']');
    expect(result).toStrictEqual([{ string: 'stores' }, { string: '{{{\'}' }, { string: 'storeName' }, { string: '"[[]]' }]);
  });
  it('Get end, append, wildcard, and all', () => {
    const result = transform('stores[{$end}][{$append}][*][{*}][{$all}]');
    expect(result).toStrictEqual([{ string: 'stores' }, { query: [{ custom: 'end' }] }, { query: [{ custom: 'append' }] }, { wildcard: true }, { wildcard: true }, { wildcard: true }]);
  });
  it('Relative path witin other relative path', () => {
    const result = transform('stores[{$.items[{$.family}]}]');
    expect(result).toStrictEqual([{ string: 'stores' }, { query: [{ relativePath: 'items[{$.family}]', relativeDepth: 0 }] }]);
  });
  it('Relative path witin other relative path within relative path', () => {
    const result = transform('stores[{$.items[{$.family[{$.test}]}]}]');
    expect(result).toStrictEqual([{ string: 'stores' }, { query: [{ relativePath: 'items[{$.family[{$.test}]}]', relativeDepth: 0 }] }]);
  });
  it('Testing query in query path', () => {
    const result = transform('stores[{$.storeName = $mainStore}].items[{$.price >= $stores[{$.storeName = $mainStore}].expensive}].name');
    expect(result).toStrictEqual([{ string: 'stores' }, { query: [{ relativePath: 'storeName', relativeDepth: 0 }, { value: '=' }, { absolutePath: 'mainStore' }] }, { string: 'items' }, { query: [{ relativePath: 'price', relativeDepth: 0 }, { value: '>=' }, { absolutePath: 'stores[{$.storeName = $mainStore}].expensive' }] }, { string: 'name' }]);
  });
  it('Test invalid relative query', () => {
    let message = null;
    try {
      transform('stores[{$.}].storeName');
    } catch (err) {
      message = err.message;
    }
    expect(message).toStrictEqual('Query element is invalid.');
  });
  it('Test invalid absolute query', () => {
    let message = null;
    try {
      transform('stores[{$}].storeName');
    } catch (err) {
      message = err.message;
    }
    expect(message).toStrictEqual('Query element is invalid.');
  });
  it('Testing query equal to object', () => {
    const result = transform(`stores[{$.storeName = $JSON(${JSON.stringify({ test: true })})}]`);
    expect(result).toStrictEqual([{ string: 'stores' }, { query: [{ relativePath: 'storeName', relativeDepth: 0 }, { value: '=' }, { value: { test: true } }] }]);
  });
  it('Test invalid element in path', () => {
    let message = null;
    try {
      transform([{ somethingNonExistent: 'stores' }, { string: '0' }, { string: 'storeName' }]);
    } catch (err) {
      message = err.message;
    }
    expect(message).toStrictEqual('Path element {"somethingNonExistent":"stores"} is invalid.');
  });
});
