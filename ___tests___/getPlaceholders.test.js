/* eslint-disable no-undef */
const getPlaceholders = require('../src/services/mapBuilder/src/getPlaceholders');

describe('getPlaceholders', () => {
  it('Get simple placeholder', () => {
    const result = getPlaceholders('[1][=(path.to.something)].[:(abc)][=(second)]');
    expect(result).toStrictEqual(['=(path.to.something)', '=(second)']);
  });
  it('Get simple placeholder, but ignore string', () => {
    const result = getPlaceholders('[1][=(path.to["(foo)"]something)].[:(abc)]["=([\'=(12)\')"]');
    expect(result).toStrictEqual(['=(path.to["(foo)"]something)']);
  });
  it('No placeholder if = is not followed by (', () => {
    const result = getPlaceholders('[1][=path.to.something)].[:(abc)][==(second)]');
    expect(result).toStrictEqual(['=(second)']);
  });
});
