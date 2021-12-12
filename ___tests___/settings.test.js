/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const SettingsLoader = require('../src/services/settingsLoader');
const defaultFormatter = require('../src/services/settingsLoader/src/defaultFormatter');

describe('Test SettingsLoader', () => {
  it('Test undefined settings', () => {
    const settingsLoader = new SettingsLoader({});
    expect(settingsLoader.settings).toStrictEqual({
      fatalErrorOnCreate: false,
      mapIfNotFound: false,
      ignoreOnTransform: [],
      unlinkInputObject: false,
      limit: 0,
      formatter: defaultFormatter,
      functions: {},
    });
  });
  it('Test some settings', () => {
    const settingsLoader = new SettingsLoader({
      settings: { limit: 3 },
    });
    expect(settingsLoader.settings).toStrictEqual({
      fatalErrorOnCreate: false,
      mapIfNotFound: false,
      ignoreOnTransform: [],
      unlinkInputObject: false,
      limit: 3,
      formatter: defaultFormatter,
      functions: {},
    });
  });
  it('Custom settings will be loaded correctly', () => {
    const customFormatter = (value) => `${value}-test`;
    const settingsLoader = new SettingsLoader({
      settings: {
        fatalErrorOnCreate: true,
        mapIfNotFound: true,
        ignoreOnTransform: [null, undefined],
        unlinkInputObject: true,
        limit: 10,
        formatter: customFormatter,
        functions: {},
      },
    });
    expect(settingsLoader.settings).toStrictEqual({
      fatalErrorOnCreate: true,
      mapIfNotFound: true,
      ignoreOnTransform: [null, undefined],
      unlinkInputObject: true,
      limit: 10,
      formatter: customFormatter,
      functions: {},
    });
  });
  it('Custom settings of invalid type will be set to default', () => {
    const settingsLoader = new SettingsLoader({
      settings: {
        fatalErrorOnCreate: undefined,
        mapIfNotFound: null,
        ignoreOnTransform: {},
        unlinkInputObject: 'true',
        limit: 'abc',
        formatter: {},
        functions: null,
      },
    });
    expect(settingsLoader.settings).toStrictEqual({
      fatalErrorOnCreate: false,
      mapIfNotFound: false,
      ignoreOnTransform: [],
      unlinkInputObject: false,
      limit: 0,
      formatter: defaultFormatter,
      functions: {},
    });
  });
});
