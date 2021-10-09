const getAll = require('../../../getAll');
const get = require('../../../get');
const getPath = require('../../../getPath');
const getPaths = require('../../../getPaths');
const findAll = require('../../../findAll');
const find = require('../../../find');
const set = require('../../../set');
const setAll = require('../../../setAll');
const chop = require('../../../chop');

const mergeFunctions = require('../../../../helpers/mergeFunctions');

const services = {
  getAll,
  get,
  getPath,
  getPaths,
  findAll,
  find,
  set,
  setAll,
  chop,
};

/**
 * Merge functions if desired and call service
 * @param {Object}
 * @property service
 * @property object
 * @property path
 * @property functions
 * @property constructorsFunctions
 * @property value
 * @property settings
 * @property chopSize
 * @returns called service
 */
const callService = ({
  service, object, path, functions, constructorsFunctions, value, settings, chopSize,
}) => {
  if (service === 'chop') {
    return services[service](object, chopSize);
  }
  const funcs = mergeFunctions(functions, constructorsFunctions);
  if (['set', 'setAll'].indexOf(service) > -1) {
    return services[service](object, path, value, funcs, settings);
  }
  return services[service](object, path, funcs, settings);
};

module.exports = callService;
