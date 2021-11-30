const BasicProcessor = require('../basicProcessor');

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
      ignoreOnTransform: (setting) => Array.isArray(setting),
      unlinkInputObject: (setting) => typeof setting === 'boolean',
      buildOne: (setting) => typeof setting === 'boolean',
      resolveOne: (setting) => typeof setting === 'boolean',
      defaultGetResponse: () => true,
      defaultGetAllResponse: (setting) => setting !== undefined,
      limit: (setting) => Number(setting),
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
      buildOne: false,
      resolveOne: false,
      mapIfNotFound: false,
      ignoreOnTransform: [],
      unlinkInputObject: false,
      defaultGetResponse: undefined,
      defaultGetAllResponse: [],
      limit: 0,
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
