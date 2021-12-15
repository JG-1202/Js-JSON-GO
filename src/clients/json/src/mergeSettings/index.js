const mergeObjects = require('../../../../handlers/mergeObjects');
const makeObject = require('../../../../handlers/makeObject');

const mergeSettings = (originalSettings, customSettings) => {
  const customSettingsObject = makeObject(customSettings);
  const functions = mergeObjects([
    originalSettings.functions, customSettingsObject.functions,
  ]);
  return mergeObjects([originalSettings, { ...customSettings, functions }]);
};

module.exports = mergeSettings;
