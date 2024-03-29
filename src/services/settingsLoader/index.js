const BasicProcessor = require('../basicProcessor');
const defaultFormatter = require('./src/defaultFormatter');

class SettingsLoader extends BasicProcessor {
  constructor({ settings }) {
    super();
    this.settings = {};
    this.loadSettings({ userSettings: settings });
  }

  setSetting({ settingName, settingValue, settingDefault }) {
    const settingsValidator = {
      fatalErrorOnCreate: (setting) => typeof setting === 'boolean',
      mapIfNotFound: (setting) => typeof setting === 'boolean',
      ignoreOnTransform: (setting) => this.isArray(setting),
      unlinkInputObject: (setting) => typeof setting === 'boolean',
      limit: (setting) => Number(setting),
      formatter: (setting) => typeof setting === 'function',
      functions: (setting) => this.isObject(setting),
      parse: (setting) => typeof setting === 'boolean',
    };
    if (settingsValidator[settingName] && settingsValidator[settingName](settingValue)) {
      this.settings[settingName] = settingValue;
    } else {
      this.settings[settingName] = settingDefault;
    }
  }

  loadSettings({ userSettings }) {
    const defaultSettings = {
      fatalErrorOnCreate: false,
      mapIfNotFound: false,
      ignoreOnTransform: [],
      unlinkInputObject: false,
      limit: 0,
      formatter: defaultFormatter,
      functions: {},
      parse: false,
    };
    if (userSettings && typeof userSettings === 'object') {
      Object.keys(defaultSettings).forEach((settingName) => (
        this.setSetting({
          settingName,
          settingValue: userSettings[settingName],
          settingDefault: defaultSettings[settingName],
        })
      ));
    } else {
      this.settings = defaultSettings;
    }
  }
}

module.exports = SettingsLoader;
