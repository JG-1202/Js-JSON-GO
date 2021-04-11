const makeObject = require('../../handlers/make/makeObject');

/**
 * Merge two Objects containing functions into a single object
 * @param {Object} localFunctions - local object containing functions for specific query
 * @param {Object} globalFunctions - object containing functions for all queries
 * @returns {Object} - merged localFunctions and globalFunctions
 */
const mergeFunctions = (localFunctions, globalFunctions) => {
  if (localFunctions) {
    const local = makeObject(localFunctions);
    const allFunctions = { ...globalFunctions };
    Object.keys(local).forEach((key) => {
      if (allFunctions[key]) {
        throw new Error(`Conflicting function name ${key}.`);
      }
      allFunctions[key] = local[key];
    });
    return allFunctions;
  }
  return globalFunctions;
};

module.exports = mergeFunctions;
