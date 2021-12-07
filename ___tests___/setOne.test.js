/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const { setOne } = require('../index');

describe('Test fatalError option on set', () => {
  it('setOne with append and fetalError', () => {
    const testObject = {};
    const result = setOne(testObject, 'stores[{$append}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: true });
    expect(result).toStrictEqual({ stores: [{ storeName: 'Amsterdam' }] });
  });
  it('setOne with append and no fetalError', () => {
    const testObject = {};
    const result = setOne(testObject, 'stores[{$append}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ stores: [{ storeName: 'Amsterdam' }] });
  });
  it('setOne with end and fetalError', () => {
    const testObject = {};
    let errorMessage = null;
    try {
      result = setOne(testObject, 'stores[{$end}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Path invalid. No results found for query.');
  });
  it('setOne with end and no fetalError', () => {
    const testObject = {};
    const result = setOne(testObject, 'stores[{$end}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({});
  });
  it('setOne with end to empty array', () => {
    const testObject = { stores: [] };
    let errorMessage = null;
    try {
      result = setOne(testObject, 'stores[{$end}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Path invalid. No results found for query.');
  });
  it('Test wildcard for object', () => {
    const testObject = { wrapper: { key1: {}, key2: {} } };
    const result = setOne(testObject, 'wrapper[*].test', true, {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ wrapper: { key1: { test: true }, key2: {} } });
  });
  it('Test wildcard for array', () => {
    const testObject = { wrapper: [{}, {}] };
    const result = setOne(testObject, 'wrapper[*].test', true, {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ wrapper: [{ test: true }, {}] });
  });
  it('Use of wildcard for non-existing element', () => {
    const testObject = { wrapper: [{}, {}] };
    const result = setOne(testObject, 'wrapper2[*].test', true, {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ wrapper: [{}, {}] });
  });
  it('Use of wildcard for non-existing element returns error', () => {
    const testObject = { wrapper: [{}, {}] };
    let errorMessage = null;
    try {
      result = setOne(testObject, 'wrapper2[*].test', true, {}, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Path invalid. No results found for query.');
  });
  it('Use of wildcard for non-existing element within array returns error', () => {
    const testObject = { wrapper: [] };
    let errorMessage = null;
    try {
      result = setOne(testObject, 'wrapper[*].test', true, {}, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Path invalid. No results found for query.');
  });
});
