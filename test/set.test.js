/* eslint-disable no-undef */
const { set } = require('../index.js');

describe('Test fatalError option on set', () => {
  it('Set with append and fetalError', () => {
    const testObject = {};
    const result = set(testObject, 'stores[{$append}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: true });
    expect(result).toStrictEqual({ stores: [{ storeName: 'Amsterdam' }] });
  });
  it('Set with append and no fetalError', () => {
    const testObject = {};
    const result = set(testObject, 'stores[{$append}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ stores: [{ storeName: 'Amsterdam' }] });
  });
  it('Set with end and fetalError', () => {
    const testObject = {};
    let errorMessage = null;
    try {
      result = set(testObject, 'stores[{$end}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('No results found for provided query [{"custom":"end"}].');
  });
  it('Set with end and no fetalError', () => {
    const testObject = {};
    const result = set(testObject, 'stores[{$end}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ stores: {} });
  });
  it('Set with end to empty array', () => {
    const testObject = { stores: [] };
    let errorMessage = null;
    try {
      result = set(testObject, 'stores[{$end}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('No results found for provided query [{"custom":"end"}].');
  });
  it('Test wildcard for object', () => {
    const testObject = { wrapper: { key1: {}, key2: {} } };
    const result = set(testObject, 'wrapper[*].test', true, {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ wrapper: { key1: { test: true }, key2: {} } });
  });
  it('Test wildcard for array', () => {
    const testObject = { wrapper: [{}, {}] };
    const result = set(testObject, 'wrapper[*].test', true, {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ wrapper: [{ test: true }, {}] });
  });
  it('Use of wildcard for non-existing element', () => {
    const testObject = { wrapper: [{}, {}] };
    const result = set(testObject, 'wrapper2[*].test', true, {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ wrapper: [{}, {}], wrapper2: {} });
  });
  it('Use of wildcard for non-existing element returns error', () => {
    const testObject = { wrapper: [{}, {}] };
    let errorMessage = null;
    try {
      result = set(testObject, 'wrapper2[*].test', true, {}, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('No element is found for provided wildcard.');
  });
  it('Use of wildcard for non-existing element within array returns error', () => {
    const testObject = { wrapper: [] };
    let errorMessage = null;
    try {
      result = set(testObject, 'wrapper[*].test', true, {}, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('No element is found for provided wildcard.');
  });
  it('Use of wildcard for non-existing element returns error (old style)', () => {
    const testObject = { wrapper: [{}, {}] };
    let errorMessage = null;
    try {
      result = set(testObject, 'wrapper2[*].test', true, true);
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('No element is found for provided wildcard.');
  });
});
