const Json = require('./src/services/json');
const Map = require('./src/services/map');

const set = require('./src/services/set');
const setAll = require('./src/services/setAll');
const find = require('./src/services/find');
const findAll = require('./src/services/findAll');
const get = require('./src/services/get');
const getAll = require('./src/services/getAll');
const getPath = require('./src/services/getPath');
const getPaths = require('./src/services/getPaths');
const chop = require('./src/services/chop');
const unlink = require('./src/handlers/basic/unlink');
const makeObject = require('./src/handlers/make/makeObject');
const makeArray = require('./src/handlers/make/makeArray');
const makeJson = require('./src/handlers/make/makeJson');
const parse = require('./src/handlers/basic/parse');
const stringify = require('./src/handlers/basic/stringify');

const resolve = require('./src/handlers/resolve/resolve');
const resolveAll = require('./src/handlers/resolve/resolveAll');

module.exports.Map = Map;
module.exports.Json = Json;

module.exports.set = set;
module.exports.setAll = setAll;
module.exports.get = get;
module.exports.getAll = getAll;
module.exports.find = find;
module.exports.findAll = findAll;
module.exports.getPath = getPath;
module.exports.getPaths = getPaths;
module.exports.makeObject = makeObject;
module.exports.makeArray = makeArray;
module.exports.makeJson = makeJson;
module.exports.parse = parse;
module.exports.stringify = stringify;
module.exports.chop = chop;
module.exports.unlink = unlink;

module.exports.helpers = { resolve, resolveAll };
