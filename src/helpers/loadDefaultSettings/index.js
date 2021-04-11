/**
 * If setting is found, do not change it, otherwise set defaultSetting as setting property
*/
const setDefault = (settings, setting, defaultSetting) => {
  if (settings[setting] !== undefined) {
    return settings[setting];
  }
  return defaultSetting;
};

/**
 * Load default settings
 * @param {Object} settings - settings object
 * @returns {Object} input settings object supplemented by default settings
 */
const loadDefaultSettings = (settings) => {
  setDefault(settings, 'fatalErrorOnCreate', false);
  setDefault(settings, 'mapIfNotFound', false);
  setDefault(settings, 'unlinkInputObject', false);
  setDefault(settings, 'defaultGetResponse', undefined);
  setDefault(settings, 'defaultGetAllResponse', []);
  return settings;
};

module.exports = loadDefaultSettings;
