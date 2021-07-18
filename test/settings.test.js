const loadDefaultSettings = require('../src/settings/loadDefaultSettings');

describe('Test loadDefaultSettings', () => {
    it('Test undefined settings', () => {
        const settings = loadDefaultSettings();
        expect(settings).toStrictEqual({
            fatalErrorOnCreate: false,
            mapIfNotFound: false,
            ignoreOnTranslate: [],
            unlinkInputObject: false,
            defaultGetResponse: undefined,
            defaultGetAllResponse: []
        });
    });
    it('Custom settings will be loaded correctly', () => {
        const settings = loadDefaultSettings({
            fatalErrorOnCreate: true,
            mapIfNotFound: true,
            ignoreOnTranslate: [null, undefined],
            unlinkInputObject: true,
            defaultGetResponse: '',
            defaultGetAllResponse: null
        });
        expect(settings).toStrictEqual({
            fatalErrorOnCreate: true,
            mapIfNotFound: true,
            ignoreOnTranslate: [null, undefined],
            unlinkInputObject: true,
            defaultGetResponse: '',
            defaultGetAllResponse: null
        });
    });
    it('Custom settings of invalid type will be set to default', () => {
        const settings = loadDefaultSettings({
            fatalErrorOnCreate: undefined,
            mapIfNotFound: null,
            ignoreOnTranslate: {},
            unlinkInputObject: 'true',
            defaultGetResponse: '',
            defaultGetAllResponse: null
        });
        expect(settings).toStrictEqual({
            fatalErrorOnCreate: false,
            mapIfNotFound: false,
            ignoreOnTranslate: [],
            unlinkInputObject: false,
            defaultGetResponse: '',
            defaultGetAllResponse: null
        });
    });
    it('Deprecated ingnoreOnTranslate still supported until v1.0.0', () => {
        const settings = loadDefaultSettings({
            fatalErrorOnCreate: true,
            mapIfNotFound: true,
            ingnoreOnTranslate: [null, undefined],
            unlinkInputObject: true,
            defaultGetResponse: '',
            defaultGetAllResponse: null
        });
        expect(settings).toStrictEqual({
            fatalErrorOnCreate: true,
            mapIfNotFound: true,
            ignoreOnTranslate: [null, undefined],
            unlinkInputObject: true,
            defaultGetResponse: '',
            defaultGetAllResponse: null
        });
    });
    it('Deprecated ingnoreOnTranslate still supported until v1.0.0, but ignoreOnTranslate has priority', () => {
        const settings = loadDefaultSettings({
            fatalErrorOnCreate: true,
            mapIfNotFound: true,
            ingnoreOnTranslate: [null, undefined, ''],
            unlinkInputObject: true,
            defaultGetResponse: '',
            defaultGetAllResponse: null
        });
        expect(settings).toStrictEqual({
            fatalErrorOnCreate: true,
            mapIfNotFound: true,
            ignoreOnTranslate: [null, undefined, ''],
            unlinkInputObject: true,
            defaultGetResponse: '',
            defaultGetAllResponse: null
        });
    });
});