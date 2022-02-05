/* eslint-disable no-undef  */
/* eslint-disable max-lines-per-function  */
const JG = require('../../index');
const inputFixture = require('../fixtures/inputFixture.json');

describe('Map.set', () => {
  it('Set destination', () => {
    const map = new JG.Map();
    map.set('some.path', 1);
    expect(map.export()).toStrictEqual({ some: { path: 1 } });
  });
  it('Set destination with placeholder', () => {
    const map = new JG.Map(inputFixture);
    map.set('[=(stores[*].storeName)].path', 1);
    expect(map.export()).toStrictEqual({
      Amsterdam: { path: 1 },
      Barcelona: { path: 1 },
      Berlin: { path: 1 },
      Rome: { path: 1 },
    });
  });
  it('Set destination with placeholder uses limit from settings', () => {
    const map = new JG.Map(inputFixture, undefined, { limit: 2 });
    map.set('[=(stores[*].storeName)].path', 1);
    expect(map.export()).toStrictEqual({
      Amsterdam: { path: 1 },
      Berlin: { path: 1 },
    });
  });
  it('Set destination with placeholder custom settings overwrite default settings', () => {
    const map = new JG.Map(inputFixture, undefined, { limit: 2 });
    map.set('[=(stores[*].storeName)].path', 1, { limit: 3 });
    expect(map.export()).toStrictEqual({
      Amsterdam: { path: 1 },
      Berlin: { path: 1 },
      Barcelona: { path: 1 },
    });
  });
  it('Set destination with placeholder that has a query in it', () => {
    const map = new JG.Map(inputFixture);
    map.set('[=(stores[{$.storeName = "Amsterdam"}].storeName)].path', 1);
    expect(map.export()).toStrictEqual({
      Amsterdam: { path: 1 },
    });
  });
  it('Doesn\'t break on placeholder within placeholder, but instead doesn\'t map it', () => {
    const map = new JG.Map(inputFixture);
    map.set('[=(stores[{$.storeName = =(stores[0].storeName)}].storeName)].path', 1);
    expect(map.export()).toStrictEqual();
  });
});
