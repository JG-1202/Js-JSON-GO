const Json = require('./json.js');
const Map = require('./map.js');

const set = require('./src/handlers/set/set');
const setAll = require('./src/handlers/set/setAll');
const get = require('./src/handlers/get/get');
const getAll = require('./src/handlers/get/getAll');
const makeObject = require('./src/handlers/make/makeObject');
const makeArray = require('./src/handlers/make/makeArray');
const makeJson = require('./src/handlers/make/makeJson');
const parse = require('./src/handlers/basic/parse');
const stringify = require('./src/handlers/basic/stringify');
const chop = require('./src/handlers/basic/chop');
const unlink = require('./src/handlers/basic/unlink');

module.exports.Map = Map;
module.exports.Json = Json;

module.exports.set = set;
module.exports.setAll = setAll;
module.exports.get = get;
module.exports.getAll = getAll;
module.exports.makeObject = makeObject;
module.exports.makeArray = makeArray;
module.exports.makeJson = makeJson;
module.exports.parse = parse;
module.exports.stringify = stringify;
module.exports.chop = chop;
module.exports.unlink = unlink;
