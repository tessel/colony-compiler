var bytecode = require('./bytecode');

/**
 * Module API
 */

function ColonyVMError(message) {
    this.name = "ColonyVMError";
    this.message = (message || "");
}
ColonyVMError.prototype = Error.prototype;

exports.ColonyVMError = ColonyVMError;

exports.colonize = require('./colonize');

exports.toBytecode = function (lua, f, next) {
  next = typeof f == 'function' ? f : next;
  f = typeof f == 'string' ? f : 'usercode.js';
  bytecode.compile(lua, '@' + f, next);
};

exports.all = require('./all');
