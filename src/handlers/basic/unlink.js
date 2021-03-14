/**
 * Unlinks object, removes reference to other object
 * @param {any} obj - object/array or any other input
 * @returns {object} unlinked object/array or initial input
 */
const unlink = (obj) => {
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj));
  }
  return obj;
};

module.exports = unlink;
