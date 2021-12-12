/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const { set } = require('../index');

describe('Test fatalError option on set', () => {
  it('Set with append and fetalError', () => {
    const testObject = {};
    const result = set(testObject, 'stores[{$append}].storeName', 'Amsterdam', { fatalErrorOnCreate: true });
    expect(result).toStrictEqual({ stores: [{ storeName: 'Amsterdam' }] });
  });
  it('Set with append and no fetalError', () => {
    const testObject = {};
    const result = set(testObject, 'stores[{$append}].storeName', 'Amsterdam', { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ stores: [{ storeName: 'Amsterdam' }] });
  });
  it('Set with end and fetalError', () => {
    const testObject = {};
    let errorMessage = null;
    try {
      result = set(testObject, 'stores[{$end}].storeName', 'Amsterdam', { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Path invalid. No results found for query.');
  });
  it('Set with end and no fetalError', () => {
    const testObject = {};
    const result = set(testObject, 'stores[{$end}].storeName', 'Amsterdam', { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({});
  });
  it('Set with end to empty array', () => {
    const testObject = { stores: [] };
    let errorMessage = null;
    try {
      result = set(testObject, 'stores[{$end}].storeName', 'Amsterdam', { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Path invalid. No results found for query.');
  });
  it('Test wildcard for object', () => {
    const testObject = { wrapper: { key1: {}, key2: {} } };
    const result = set(testObject, 'wrapper[*].test', true, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ wrapper: { key1: { test: true }, key2: { test: true } } });
  });
  it('Test wildcard for array', () => {
    const testObject = { wrapper: [{ }, { }] };
    const result = set(testObject, 'wrapper[*].test', true, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ wrapper: [{ test: true }, { test: true }] });
  });
  it('Use of wildcard for non-existing element', () => {
    const testObject = { wrapper: [{}, {}] };
    const result = set(testObject, 'wrapper2[*].test', true, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ wrapper: [{}, {}] });
  });
  it('Use of wildcard for non-existing element returns error', () => {
    const testObject = { wrapper: [{}, {}] };
    let errorMessage = null;
    try {
      result = set(testObject, 'wrapper2[*].test', true, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Path invalid. No results found for query.');
  });
  it('Use of wildcard for non-existing element returns error 2', () => {
    const testObject = { wrapper: [] };
    let errorMessage = null;
    try {
      result = set(testObject, 'wrapper[*].test', true, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Path invalid. No results found for query.');
  });
  it('Use of custom function', () => {
    const testObject = [[], [{ test: true }, { test: true }, { test: false }]];
    const customFunction = (element) => element.test === true;
    const result = set(testObject, '[*][{$Function(customFunction)}].test2', true, { functions: { customFunction }, fatalErrorOnCreate: false });
    expect(result).toStrictEqual(
      [[], [{ test: true, test2: true }, { test: true, test2: true }, { test: false }]],
    );
  });
});
