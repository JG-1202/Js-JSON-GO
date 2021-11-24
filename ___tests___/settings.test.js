/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const SettingsLoader = require('../src/handlers/settingsLoader');

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
      defaultGetResponse: undefined,
      defaultGetAllResponse: [],
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
      defaultGetResponse: undefined,
      defaultGetAllResponse: [],
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
        defaultGetResponse: '',
        defaultGetAllResponse: null,
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
      defaultGetResponse: '',
      defaultGetAllResponse: null,
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
        defaultGetResponse: '',
        defaultGetAllResponse: null,
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
      defaultGetResponse: '',
      defaultGetAllResponse: null,
      limit: 0,
    });
  });
});
