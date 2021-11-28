/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const PathTransformer = require('../src/services/pathTransformer');

const transform = (path) => {
  const pathTransformer = new PathTransformer({});
  return pathTransformer.transformPath(path);
};

describe('Test getting a value', () => {
  it('Single element', () => {
    const result = transform('stores');
    expect(result).toStrictEqual([{ string: 'stores' }]);
  });
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
  it('Relative path within other relative path', () => {
    const result = transform('stores[{$.items[{$.family}]}]');
    expect(result).toStrictEqual([{ string: 'stores' }, { query: [{ relativePath: 'items[{$.family}]', relativeDepth: 0 }] }]);
  });
  it('Relative path within other relative path within relative path', () => {
    const result = transform('stores[{$.items[{$.family[{$.test}]}]}]');
    expect(result).toStrictEqual([{ string: 'stores' }, { query: [{ relativePath: 'items[{$.family[{$.test}]}]', relativeDepth: 0 }] }]);
  });
  it('Testing with reference', () => {
    const result = transform('stores[{$.items[{$.family[{$.test}]}]}:(refName)]');
    expect(result).toStrictEqual([{ string: 'stores' }, { reference: 'refName', query: [{ relativePath: 'items[{$.family[{$.test}]}]', relativeDepth: 0 }] }]);
  });
  it('Testing with reference on simple element', () => {
    const result = transform('[stores:(first)][{$.items[{$.family[{$.test}]}]}:(refName)]');
    expect(result).toStrictEqual([{ string: 'stores', reference: 'first' }, { reference: 'refName', query: [{ relativePath: 'items[{$.family[{$.test}]}]', relativeDepth: 0 }] }]);
  });
  it('Testing with reference within query', () => {
    const result = transform('stores[{$.items[{$.family[{$.test}:(refName)]}]}]');
    expect(result).toStrictEqual([{ string: 'stores' }, { query: [{ relativePath: 'items[{$.family[{$.test}:(refName)]}]', relativeDepth: 0 }] }]);
  });
  it('Testing with invalid reference; element will be considered a string', () => {
    const result = transform('stores[{$.items[{$.family[{$.test}]}]}:(refName{})]');
    expect(result).toStrictEqual([{ string: 'stores' }, { string: '{$.items[{$.family[{$.test}]}]}:(refName{})' }]);
  });
  it('Testing query in query path', () => {
    const result = transform('stores[{$.storeName = $mainStore}].items[{$.price >= $stores[{$.storeName = $mainStore}].expensive}].name');
    expect(result).toStrictEqual([{ string: 'stores' }, { query: [{ relativePath: 'storeName', relativeDepth: 0 }, { value: '=' }, { absolutePath: 'mainStore' }] }, { string: 'items' }, { query: [{ relativePath: 'price', relativeDepth: 0 }, { value: '>=' }, { absolutePath: 'stores[{$.storeName = $mainStore}].expensive' }] }, { string: 'name' }]);
  });
  it('Testing whether numbers are transformed to numbers and relative depth is calculated correctly', () => {
    const result = transform('[0][2]itemFamilies[{$.small.price <= 1}][{$...small.price <= "1"}]');
    expect(result).toStrictEqual([{ number: 0 }, { number: 2 }, { string: 'itemFamilies' }, { query: [{ relativePath: 'small.price', relativeDepth: 0 }, { value: '<=' }, { value: 1 }] }, { query: [{ relativePath: 'small.price', relativeDepth: -2 }, { value: '<=' }, { value: '1' }] }]);
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
      transform({});
    } catch (err) {
      message = err.message;
    }
    expect(message).toStrictEqual('Input path is invalid.');
  });
});
