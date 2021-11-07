const returnObject = require('../../helpers/returnObject');

/**
 * Support for deprecated settings.
 */
const backWardCompatability = (settings, oldSetting, newSetting) => {
  const settingsObject = settings;
  if (settingsObject[oldSetting]) {
    console.warn(`Deprecation warning: The use of ${oldSetting} as settings property is deprecated and will be removed from version 1.0.0 onwards. Use ${newSetting} instead.`);
    if (!settingsObject[newSetting]) {
      settingsObject[newSetting] = settingsObject[oldSetting];
    }
    delete settingsObject[oldSetting];
  }
};

/**
 * logical checks on whether settings are defined as expected
 */
const settingsValidator = {
  fatalErrorOnCreate: (setting) => typeof setting === 'boolean',
  mapIfNotFound: (setting) => typeof setting === 'boolean',
  ignoreOnTransform: (setting) => Array.isArray(setting),
  unlinkInputObject: (setting) => typeof setting === 'boolean',
  buildOne: (setting) => typeof setting === 'boolean',
  resolveOne: (setting) => typeof setting === 'boolean',
  defaultGetResponse: () => true,
  defaultGetAllResponse: () => true,
};

/**
 * If setting is found and is valid, do not change it,
 * otherwise set defaultSetting as setting property
*/
const setDefault = (settings, settingName, defaultSetting) => {
  const settingsObject = settings;
  if (settingsObject[settingName] === undefined
    || !settingsValidator[settingName](settingsObject[settingName])
  ) {
    settingsObject[settingName] = defaultSetting;
  }
  return settingsObject;
};

/**
 * Check whether default settings were already loaded.
 */
const areDefaultSettingsAlreadyLoaded = (settings) => settings && settings.defaultSettingsLoaded;

/**
 * Load default settings
 * @param {Object} settings - settings object
 * @returns {Object} input settings object supplemented by default settings
 */
const loadDefaultSettings = (settings) => {
  if (areDefaultSettingsAlreadyLoaded(settings)) {
    return settings;
  }
  const settingsObject = returnObject(settings);
  backWardCompatability(settingsObject, 'ingnoreOnTranslate', 'ignoreOnTransform');
  backWardCompatability(settingsObject, 'ignoreOnTranslate', 'ignoreOnTransform');
  setDefault(settingsObject, 'fatalErrorOnCreate', false);
  setDefault(settingsObject, 'buildOne', false);
  setDefault(settingsObject, 'resolveOne', false);
  setDefault(settingsObject, 'mapIfNotFound', false);
  setDefault(settingsObject, 'ignoreOnTransform', []);
  setDefault(settingsObject, 'unlinkInputObject', false);
  setDefault(settingsObject, 'defaultGetResponse', undefined);
  setDefault(settingsObject, 'defaultGetAllResponse', []);
  settingsObject.defaultSettingsLoaded = true;
  return settingsObject;
};

module.exports = loadDefaultSettings;
