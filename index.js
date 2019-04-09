const pjson = require('./package.json');

module.exports.VERSION = pjson.version;
module.exports.Vector = require("./src/vector");
module.exports.Matrix = require("./src/matrix");