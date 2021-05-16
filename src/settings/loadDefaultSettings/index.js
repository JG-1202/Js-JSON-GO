const returnObject = require('../../helpers/returnObject');

/**
 * If setting is found, do not change it, otherwise set defaultSetting as setting property
*/
const setDefault = (settings, setting, defaultSetting) => {
  const settingsObject = settings;
  if (settingsObject[setting] === undefined) {
    settingsObject[setting] = defaultSetting;
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
  setDefault(settingsObject, 'fatalErrorOnCreate', false);
  setDefault(settingsObject, 'mapIfNotFound', false);
  setDefault(settingsObject, 'unlinkInputObject', false);
  setDefault(settingsObject, 'defaultGetResponse', undefined);
  setDefault(settingsObject, 'defaultGetAllResponse', []);
  return settingsObject;
};

module.exports = loadDefaultSettings;
