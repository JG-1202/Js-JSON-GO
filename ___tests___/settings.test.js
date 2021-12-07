/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const SettingsLoader = require('../src/services/settingsLoader');

describe('Test SettingsLoader', () => {
  it('Test undefined settings', () => {
    const settingsLoader = new SettingsLoader({});
    expect(settingsLoader.settings).toStrictEqual({
      fatalErrorOnCreate: false,
      mapIfNotFound: false,
      ignoreOnTransform: [],
      unlinkInputObject: false,
      resolveOne: false,
      buildOne: false,
      defaultGetOneResponse: undefined,
      defaultGetResponse: [],
      limit: 0,
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
      resolveOne: false,
      buildOne: false,
      defaultGetOneResponse: undefined,
      defaultGetResponse: [],
      limit: 3,
    });
  });
  it('Custom settings will be loaded correctly', () => {
    const settingsLoader = new SettingsLoader({
      settings: {
        fatalErrorOnCreate: true,
        mapIfNotFound: true,
        ignoreOnTransform: [null, undefined],
        unlinkInputObject: true,
        resolveOne: true,
        buildOne: true,
        defaultGetOneResponse: '',
        defaultGetResponse: null,
        limit: 10,
      },
    });
    expect(settingsLoader.settings).toStrictEqual({
      fatalErrorOnCreate: true,
      mapIfNotFound: true,
      ignoreOnTransform: [null, undefined],
      unlinkInputObject: true,
      resolveOne: true,
      buildOne: true,
      defaultGetOneResponse: '',
      defaultGetResponse: null,
      limit: 10,
    });
  });
  it('Custom settings of invalid type will be set to default', () => {
    const settingsLoader = new SettingsLoader({
      settings: {
        fatalErrorOnCreate: undefined,
        mapIfNotFound: null,
        ignoreOnTransform: {},
        unlinkInputObject: 'true',
        resolveOne: 'true',
        buildOne: 'true',
        defaultGetOneResponse: '',
        defaultGetResponse: null,
        limit: 'abc',
      },
    });
    expect(settingsLoader.settings).toStrictEqual({
      fatalErrorOnCreate: false,
      mapIfNotFound: false,
      ignoreOnTransform: [],
      unlinkInputObject: false,
      resolveOne: false,
      buildOne: false,
      defaultGetOneResponse: '',
      defaultGetResponse: null,
      limit: 0,
    });
  });
});
