/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const { setAll } = require('../index');

describe('Test fatalError option on set', () => {
  it('Set with append and fetalError', () => {
    const testObject = {};
    const result = setAll(testObject, 'stores[{$append}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: true });
    expect(result).toStrictEqual({ stores: [{ storeName: 'Amsterdam' }] });
  });
  it('Set with append and no fetalError', () => {
    const testObject = {};
    const result = setAll(testObject, 'stores[{$append}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ stores: [{ storeName: 'Amsterdam' }] });
  });
  it('Set with end and fetalError', () => {
    const testObject = {};
    let errorMessage = null;
    try {
      result = setAll(testObject, 'stores[{$end}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('No results found for provided query [{"custom":"end"}].');
  });
  it('Set with end and no fetalError', () => {
    const testObject = {};
    const result = setAll(testObject, 'stores[{$end}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ stores: {} });
  });
  it('Set with end to empty array', () => {
    const testObject = { stores: [] };
    let errorMessage = null;
    try {
      result = setAll(testObject, 'stores[{$end}].storeName', 'Amsterdam', {}, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('No results found for provided query [{"custom":"end"}].');
  });
  it('Test wildcard for object', () => {
    const testObject = { wrapper: { key1: {}, key2: {} } };
    const result = setAll(testObject, 'wrapper[*].test', true, {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ wrapper: { key1: { test: true }, key2: { test: true } } });
  });
  it('Test wildcard for array', () => {
    const testObject = { wrapper: [{}, {}] };
    const result = setAll(testObject, 'wrapper[*].test', true, {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ wrapper: [{ test: true }, { test: true }] });
  });
  it('Use of wildcard for non-existing element', () => {
    const testObject = { wrapper: [{}, {}] };
    const result = setAll(testObject, 'wrapper2[*].test', true, {}, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ wrapper: [{}, {}], wrapper2: {} });
  });
  it('Use of wildcard for non-existing element returns error', () => {
    const testObject = { wrapper: [{}, {}] };
    let errorMessage = null;
    try {
      result = setAll(testObject, 'wrapper2[*].test', true, {}, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('No element is found for provided wildcard.');
  });
  it('Use of wildcard for non-existing element returns error 2', () => {
    const testObject = { wrapper: [] };
    let errorMessage = null;
    try {
      result = setAll(testObject, 'wrapper[*].test', true, {}, { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('No element is found for provided wildcard.');
  });
  it('Use of wildcard for non-existing element returns error 2 (old style)', () => {
    const testObject = { wrapper: [] };
    let errorMessage = null;
    try {
      result = setAll(testObject, 'wrapper[*].test', true, true);
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('No element is found for provided wildcard.');
  });
  it('Use of custom function', () => {
    const testObject = [[], [{ test: true }, { test: true }, { test: false }]];
    const customFunction = (element) => element.test === true;
    const result = setAll(testObject, '[*][{$Function(customFunction)}].test2', true, { customFunction }, { fatalErrorOnCreate: false });
    expect(result).toStrictEqual(
      [[], [{ test: true, test2: true }, { test: true, test2: true }, { test: false }]],
    );
  });
});
