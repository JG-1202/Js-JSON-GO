const chopHandler = require('../../handlers/basic/chop');

/**
 * Chops an array or object into smaller pieces
 * @param {object} value - object or array
 * @param {number} chopSize - size of pieces.
 * @returns {Array} array of chopped pieces.
 */
const chop = (object, chopSize) => chopHandler(object, chopSize);

module.exports = chop;
