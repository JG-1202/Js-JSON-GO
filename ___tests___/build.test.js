/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const {
  build, buildOne, buildAll, Json,
} = require('../index');
const JG = require('../index');

describe('Test fatalError option on set', () => {
  it('Build with append and fetalError', () => {
    const testObject = {};
    const result = build(testObject, 'stores[{$append}].storeName', () => 'Amsterdam', { fatalErrorOnCreate: true });
    expect(result).toStrictEqual({ stores: [{ storeName: 'Amsterdam' }] });
  });
  it('Build with append and no fetalError', () => {
    const testObject = {};
    const result = build(testObject, 'stores[{$append}].storeName', () => 'Amsterdam', { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({ stores: [{ storeName: 'Amsterdam' }] });
  });
  it('Build with end and fetalError', () => {
    const testObject = {};
    let errorMessage = null;
    try {
      result = build(testObject, 'stores[{$end}].storeName', () => 'Amsterdam', { fatalErrorOnCreate: true });
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toStrictEqual('Path invalid. No results found for query.');
  });
  it('Build with end and no fetalError', () => {
    const testObject = {};
    const result = build(testObject, 'stores[{$end}].storeName', () => 'Amsterdam', { fatalErrorOnCreate: false });
    expect(result).toStrictEqual({});
  });
  it('buildAll vs buildOne', () => {
    const testObject = [{}, {}, {}];
    const result = buildOne(testObject, '[*].test', () => 'abc');
    expect(result).toStrictEqual([{ test: 'abc' }, {}, {}]);
    const resultNew = buildAll(testObject, '[*].abc', () => 123);
    expect(resultNew).toStrictEqual([{ test: 'abc', abc: 123 }, { abc: 123 }, { abc: 123 }]);
  });
  it('build, buildOne, buildAll from Json', () => {
    const JsonGo = new Json([{}, {}, {}], { limit: 2 });
    JsonGo.buildOne('[*].test', () => 'abc');
    JsonGo.buildAll('[*].abc', () => 123);
    JsonGo.build('[*].foo', () => 'bar');
    expect(JsonGo.export()).toStrictEqual([{ test: 'abc', abc: 123, foo: 'bar' }, { abc: 123, foo: 'bar' }, { abc: 123 }]);
  });
  it('build settings are used from Json', () => {
    const JsonGo = new Json([{}, {}, {}], { limit: 8 });
    JsonGo.build('[*].foo', () => 'bar', { limit: 2 });
    expect(JsonGo.export()).toStrictEqual([{ foo: 'bar' }, { foo: 'bar' }, { }]);
  });
});

describe('README examples', () => {
  it('build', () => {
    const inputObject = {
      scans: [
        { barcode: 'abc123', accuracy: 90, identifier: 'A' },
        { barcode: 'def456', accuracy: 50, identifier: 'B' },
        { barcode: 'ghi789', accuracy: 94, identifier: 'C' },
      ],
    };
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    JsonGo.build('scans[*].attributes[0].code', () => 8);
    const result = JsonGo.export();
    expect(result).toStrictEqual({
      scans: [
        {
          barcode: 'abc123', accuracy: 90, identifier: 'A', attributes: [{ code: 8 }],
        },
        {
          barcode: 'def456', accuracy: 50, identifier: 'B', attributes: [{ code: 8 }],
        },
        { barcode: 'ghi789', accuracy: 94, identifier: 'C' },
      ],
    });
  });
  it('buildOne', () => {
    const inputObject = {
      scans: [
        { barcode: 'abc123', accuracy: 90, identifier: 'A' },
        { barcode: 'def456', accuracy: 50, identifier: 'B' },
        { barcode: 'ghi789', accuracy: 94, identifier: 'C' },
      ],
    };
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    JsonGo.buildOne('scans[{$.accuracy >= 90}].success', () => true);
    const result = JsonGo.export();
    expect(result).toStrictEqual({
      scans: [
        {
          barcode: 'abc123', accuracy: 90, identifier: 'A', success: true,
        },
        { barcode: 'def456', accuracy: 50, identifier: 'B' },
        { barcode: 'ghi789', accuracy: 94, identifier: 'C' },
      ],
    });
  });
  it('buildAll', () => {
    const inputObject = {
      scans: [
        { barcode: 'abc123', accuracy: 90, identifier: 'A' },
        { barcode: 'def456', accuracy: 50, identifier: 'B' },
        { barcode: 'ghi789', accuracy: 94, identifier: 'C' },
      ],
    };
    const JsonGo = new JG.Json(inputObject, { limit: 2 });
    JsonGo.buildAll('scans[{$.accuracy > 30}].accuracy', () => 99);
    const result = JsonGo.export();
    expect(result).toStrictEqual({
      scans: [
        { barcode: 'abc123', accuracy: 99, identifier: 'A' },
        { barcode: 'def456', accuracy: 99, identifier: 'B' },
        { barcode: 'ghi789', accuracy: 99, identifier: 'C' },
      ],
    });
  });
  it('build from Map', () => {
    const originObject = null;
    const destinationObject = [{}, {}, {}];
    const JsonGo = new JG.Map(originObject, destinationObject);
    const functionToCall = () => 8;
    JsonGo.build('[*].attributes[0].code', functionToCall);
    const result = JsonGo.export();
    // eslint-disable-next-line max-len
    expect(result).toStrictEqual([{ attributes: [{ code: 8 }] }, { attributes: [{ code: 8 }] }, { attributes: [{ code: 8 }] }]);
  });
});
