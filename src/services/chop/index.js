const chop = require('../../handlers/basic/chop');

/**
 * chop service to be called from class
 * @param {Object} object Object to chop
 * @param {Number} chopSize Chop size
 * @returns {Array} Array with elements of specified chopSize
 */
const chopService = (object, chopSize) => chop(object, chopSize);

module.exports = chopService;
