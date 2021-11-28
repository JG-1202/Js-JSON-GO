const Json = require('./src/handlers/json');
const Map = require('./src/handlers/map');

const set = require('./src/handlers/set');
const setAll = require('./src/handlers/setAll');
const find = require('./src/handlers/find');
const findAll = require('./src/handlers/findAll');
const get = require('./src/handlers/get');
const getAll = require('./src/handlers/getAll');
const getPath = require('./src/handlers/getPath');
const getPaths = require('./src/handlers/getPaths');
const chop = require('./src/handlers/chop');
const unlink = require('./src/services/basic/unlink');
const makeObject = require('./src/services/make/makeObject');
const makeArray = require('./src/services/make/makeArray');
const makeJson = require('./src/services/make/makeJson');
const parse = require('./src/services/basic/parse');
const stringify = require('./src/services/basic/stringify');

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
