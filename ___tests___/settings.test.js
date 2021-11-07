/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const loadDefaultSettings = require('../src/settings/loadDefaultSettings');

describe('Test loadDefaultSettings', () => {
  it('Test undefined settings', () => {
    const settings = loadDefaultSettings();
    expect(settings).toStrictEqual({
      fatalErrorOnCreate: false,
      mapIfNotFound: false,
      ignoreOnTransform: [],
      unlinkInputObject: false,
      resolveOne: false,
      buildOne: false,
      defaultGetResponse: undefined,
      defaultGetAllResponse: [],
      defaultSettingsLoaded: true,
    });
  });
  it('Custom settings will be loaded correctly', () => {
    const settings = loadDefaultSettings({
      fatalErrorOnCreate: true,
      mapIfNotFound: true,
      ignoreOnTransform: [null, undefined],
      unlinkInputObject: true,
      resolveOne: true,
      buildOne: true,
      defaultGetResponse: '',
      defaultGetAllResponse: null,
    });
    expect(settings).toStrictEqual({
      fatalErrorOnCreate: true,
      mapIfNotFound: true,
      ignoreOnTransform: [null, undefined],
      unlinkInputObject: true,
      resolveOne: true,
      buildOne: true,
      defaultGetResponse: '',
      defaultGetAllResponse: null,
      defaultSettingsLoaded: true,
    });
  });
  it('Custom settings of invalid type will be set to default', () => {
    const settings = loadDefaultSettings({
      fatalErrorOnCreate: undefined,
      mapIfNotFound: null,
      ignoreOnTransform: {},
      unlinkInputObject: 'true',
      resolveOne: 'true',
      buildOne: 'true',
      defaultGetResponse: '',
      defaultGetAllResponse: null,
    });
    expect(settings).toStrictEqual({
      fatalErrorOnCreate: false,
      mapIfNotFound: false,
      ignoreOnTransform: [],
      unlinkInputObject: false,
      resolveOne: false,
      buildOne: false,
      defaultGetResponse: '',
      defaultGetAllResponse: null,
      defaultSettingsLoaded: true,
    });
  });
  it('Deprecated ingnoreOnTranslate still supported until v1.0.0', () => {
    const settings = loadDefaultSettings({
      fatalErrorOnCreate: true,
      mapIfNotFound: true,
      ingnoreOnTranslate: [null, undefined],
      unlinkInputObject: true,
      defaultGetResponse: '',
      defaultGetAllResponse: null,
    });
    expect(settings).toStrictEqual({
      fatalErrorOnCreate: true,
      mapIfNotFound: true,
      ignoreOnTransform: [null, undefined],
      unlinkInputObject: true,
      resolveOne: false,
      buildOne: false,
      defaultGetResponse: '',
      defaultGetAllResponse: null,
      defaultSettingsLoaded: true,
    });
  });
  it('Deprecated ingnoreOnTranslate still supported until v1.0.0, but ignoreOnTransform has priority', () => {
    const settings = loadDefaultSettings({
      fatalErrorOnCreate: true,
      mapIfNotFound: true,
      ingnoreOnTranslate: [null, undefined],
      ignoreOnTransform: [null, undefined, ''],
      unlinkInputObject: true,
      resolveOne: false,
      buildOne: false,
      defaultGetResponse: '',
      defaultGetAllResponse: null,
    });
    expect(settings).toStrictEqual({
      fatalErrorOnCreate: true,
      mapIfNotFound: true,
      ignoreOnTransform: [null, undefined, ''],
      unlinkInputObject: true,
      resolveOne: false,
      buildOne: false,
      defaultGetResponse: '',
      defaultGetAllResponse: null,
      defaultSettingsLoaded: true,
    });
  });
  it('Deprecated ignoreOnTranslate still supported until v1.0.0', () => {
    const settings = loadDefaultSettings({
      fatalErrorOnCreate: true,
      mapIfNotFound: true,
      ignoreOnTranslate: [null, undefined],
      unlinkInputObject: true,
      defaultGetResponse: '',
      defaultGetAllResponse: null,
    });
    expect(settings).toStrictEqual({
      fatalErrorOnCreate: true,
      mapIfNotFound: true,
      ignoreOnTransform: [null, undefined],
      unlinkInputObject: true,
      resolveOne: false,
      buildOne: false,
      defaultGetResponse: '',
      defaultGetAllResponse: null,
      defaultSettingsLoaded: true,
    });
  });
  it('Deprecated ignoreOnTranslate still supported until v1.0.0, but ignoreOnTransform has priority', () => {
    const settings = loadDefaultSettings({
      fatalErrorOnCreate: true,
      mapIfNotFound: true,
      ignoreOnTranslate: [null, undefined],
      ignoreOnTransform: [null, undefined, ''],
      unlinkInputObject: true,
      resolveOne: false,
      buildOne: false,
      defaultGetResponse: '',
      defaultGetAllResponse: null,
    });
    expect(settings).toStrictEqual({
      fatalErrorOnCreate: true,
      mapIfNotFound: true,
      ignoreOnTransform: [null, undefined, ''],
      unlinkInputObject: true,
      resolveOne: false,
      buildOne: false,
      defaultGetResponse: '',
      defaultGetAllResponse: null,
      defaultSettingsLoaded: true,
    });
  });
});
