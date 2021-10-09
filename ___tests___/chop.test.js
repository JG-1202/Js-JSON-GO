/* eslint-disable no-undef */
const JG = require('../index');
const choppedArray = require('./fixtures/choppedArray.json');
const choppedObject = require('./fixtures/choppedObject.json');
const largeArray = require('./fixtures/largeArray');
const largeObject = require('./fixtures/largeObject');

describe('Chops an array', () => {
  it('Chops an array into pieces', () => {
    const JsonGo = new JG.Json(largeArray);
    const result = JsonGo.chop(10);
    expect(result).toStrictEqual(choppedArray);
  });
});

describe('Chops an object', () => {
  it('Chops an object into pieces', () => {
    const JsonGo = new JG.Json(largeObject);
    const result = JsonGo.chop(10);
    expect(result).toStrictEqual(choppedObject);
  });
});
