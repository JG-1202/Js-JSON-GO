/* eslint-disable */
const getAllKeysFromArray = require('../src/helpers/pathElements/getKeys/getAllKeysFromArray');
const getAllKeysFromObject = require('../src/helpers/pathElements/getKeys/getAllKeysFromObject');
const getFirstKeyFromArray = require('../src/helpers/pathElements/getKeys/getFirstKeyFromArray');
const getFirstKeyFromObject = require('../src/helpers/pathElements/getKeys/getFirstKeyFromObject');
const getMultiplePathElements = require('../src/helpers/pathElements/getMultiple');
const getSinglePathElement = require('../src/helpers/pathElements/getSingle');
const getAbsolutePath = require('../src/helpers/query/src/getAbsolutePath');
const validateResponseAndPassDefault = require('../src/helpers/validators/validateResponseAndPassDefault');

describe('ValidateResponseAndPassDefault', () => {
  it('Found vs default are not both arrays', () => {
    const result = validateResponseAndPassDefault([], '[]', [null]);
    expect(result).toStrictEqual([]);
  });
});

describe('getAbsolutePath', () => {
  it('Safety check: returns input when not absolute nor relative path', () => {
    const result = getAbsolutePath([], { someElement: true });
    expect(result).toStrictEqual({ someElement: true });
  });
});

describe('pathElements', () => {
  it('Safety check: returns undefined on invalid getType on getSinglePathElement', () => {
    const result = getSinglePathElement({ string: '123' }, {}, {}, 'number');
    expect(result).toStrictEqual(undefined);
  });
  it('Safety check: returns undefined on invalid getType on getMultiplePathElements', () => {
    const result = getMultiplePathElements({ string: '123' }, {}, {}, 'number');
    expect(result).toStrictEqual([]);
  });
  it('getAllKeysFromArray if no array', () => {
    const result = getAllKeysFromArray({}, {});
    expect(result).toStrictEqual([]);
  });
  it('getAllKeysFromObject if no object', () => {
    const result = getAllKeysFromObject([], {});
    expect(result).toStrictEqual([]);
  });
  it('getFirstKeyFromObject if no object', () => {
    const result = getFirstKeyFromObject([], {});
    expect(result).toStrictEqual(undefined);
  });
  it('getFirstKeyFromArray if no array', () => {
    const result = getFirstKeyFromArray({}, {});
    expect(result).toStrictEqual(undefined);
  });
});
