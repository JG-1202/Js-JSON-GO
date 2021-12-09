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
      mapIfNotFound: false,
      ignoreOnTransform: [],
      unlinkInputObject: false,
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
