/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */
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
  it('Chops an object into pieces', () => {
    const JsonGo = new JG.Json(largeObject);
    const result = JsonGo.chop(10);
    expect(result).toStrictEqual(choppedObject);
  });
  it('Something unchoppable', () => {
    const JsonGo = new JG.Json(null);
    const result = JsonGo.chop(10);
    expect(result).toStrictEqual([]);
  });
  it('README chop example', () => {
    const barcodes = ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'];
    const JsonGo = new JG.Json(barcodes);
    const result = JsonGo.chop(3);
    expect(result).toStrictEqual([
      ['001', '002', '003'],
      ['004', '005', '006'],
      ['007', '008', '009'],
      ['010'],
    ]);
  });
});
