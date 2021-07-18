const returnObject = require('../../helpers/returnObject');

/**
 * Support for deprecated ingnoreOnTranslate.
 */
const backWardCompatabilityIngnore = (settings) => {
  const settingsObject = settings;
  if (settingsObject.ingnoreOnTranslate) {
    console.warn('Deprecation warning: The use of ingnoreOnTranslate as settings property is deprecated and will be removed from version 1.0.0 onwards. Use ignoreOnTranslate instead.');
    if (!settingsObject.ignoreOnTranslate) {
      settingsObject.ignoreOnTranslate = settingsObject.ingnoreOnTranslate;
    }
    delete settingsObject.ingnoreOnTranslate;
  }
};

/**
 * logical checks on whether settings are defined as expected
 */
const settingsValidator = {
  fatalErrorOnCreate: (setting) => typeof setting === 'boolean',
  mapIfNotFound: (setting) => typeof setting === 'boolean',
  ignoreOnTranslate: (setting) => Array.isArray(setting),
  unlinkInputObject: (setting) => typeof setting === 'boolean',
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
 * Load default settings
 * @param {Object} settings - settings object
 * @returns {Object} input settings object supplemented by default settings
 */
const loadDefaultSettings = (settings) => {
  const settingsObject = returnObject(settings);
  backWardCompatabilityIngnore(settingsObject);
  setDefault(settingsObject, 'fatalErrorOnCreate', false);
  setDefault(settingsObject, 'mapIfNotFound', false);
  setDefault(settingsObject, 'ignoreOnTranslate', []);
  setDefault(settingsObject, 'unlinkInputObject', false);
  setDefault(settingsObject, 'defaultGetResponse', undefined);
  setDefault(settingsObject, 'defaultGetAllResponse', []);
  return settingsObject;
};

module.exports = loadDefaultSettings;
