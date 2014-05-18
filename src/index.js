var bytecode = require('./bytecode');

/**
 * Module API
 */

exports.colonize = require('./colonize');

exports.toBytecode = function (lua, f, next) {
  next = typeof f == 'function' ? f : next;
  f = typeof f == 'string' ? f : 'usercode.js';
  bytecode.compile(lua, '@' + f, next);
};