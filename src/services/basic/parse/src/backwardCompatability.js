/**
 * Function to facilitate backward compatability until v1.0.0 if safeParse setting as a boolean
 * is provided.
 * @param {Any} input
 * @returns object with safeParse as setting
 */
const backwardCompatability = (input) => {
  if (typeof input === 'boolean') {
    console.warn('Deprecation warning: The use of safeParse as direct input on parse is deprecated and will be removed from version 1.0.0 onwards. Use settings object with safeParse property instead.');
    return {
      safeParse: input,
    };
  }
  return input;
};

module.exports = backwardCompatability;
