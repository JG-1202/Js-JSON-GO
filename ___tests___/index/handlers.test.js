/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */
const JG = require('../../index');

describe('Testing handlers', () => {
  it('set, setOne, setAll', () => {
    const object = {};
    JG.set(object, 'test', true);
    JG.setOne(object, 'test2', true);
    JG.setAll(object, 'test3', true);
    expect(object).toStrictEqual({ test: true, test2: true, test3: true });
  });
  it('get, getOne, getAll', () => {
    const object = { test: true, test2: true, test3: true };
    expect(JG.get(object, '[*]')).toStrictEqual([true, true, true]);
    expect(JG.getOne(object, '[*]')).toStrictEqual(true);
    expect(JG.getAll(object, '[*]')).toStrictEqual([true, true, true]);
  });
  it('find, findOne, findAll', () => {
    const object = { test: true, test2: true, test3: true };
    expect(JG.find(object, '[*]')).toStrictEqual([{ value: true, path: 'test', references: {} }, { value: true, path: 'test2', references: {} }, { value: true, path: 'test3', references: {} }]);
    expect(JG.findOne(object, '[*]')).toStrictEqual({ value: true, path: 'test', references: {} });
    expect(JG.findAll(object, '[*]')).toStrictEqual([{ value: true, path: 'test', references: {} }, { value: true, path: 'test2', references: {} }, { value: true, path: 'test3', references: {} }]);
  });
  it('getPath, getPaths, getAllPaths', () => {
    const object = { test: true, test2: true, test3: true };
    expect(JG.getPaths(object, '[*]')).toStrictEqual(['test', 'test2', 'test3']);
    expect(JG.getPath(object, '[*]')).toStrictEqual('test');
    expect(JG.getAllPaths(object, '[*]')).toStrictEqual(['test', 'test2', 'test3']);
  });
  it('stringify, safeStringify', () => {
    const object = { test: true };
    expect(JG.stringify(object)).toStrictEqual(JSON.stringify({ test: true }));
    expect(JG.safeStringify(object)).toStrictEqual(JSON.stringify({ test: true }));
  });
  it('parse, safeParse', () => {
    const object = JSON.stringify({ test: true });
    expect(JG.parse(object)).toStrictEqual({ test: true });
    expect(JG.safeParse(object)).toStrictEqual({ test: true });
  });
  it('makeArray, makeObject, makeJson', () => {
    expect(JG.makeArray(null)).toStrictEqual([]);
    expect(JG.makeJson(null)).toStrictEqual({});
    expect(JG.makeObject(null)).toStrictEqual({});
  });
  it('chop', () => {
    expect(JG.chop([1, 2, 3], 1)).toStrictEqual([[1], [2], [3]]);
  });
  it('mergeArrays, mergeObjects', () => {
    expect(JG.mergeArrays([[1], [2], [3]])).toStrictEqual([1, 2, 3]);
    expect(JG.mergeObjects([
      { test: true }, { test2: true }])).toStrictEqual({ test: true, test2: true });
  });
});
