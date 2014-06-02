// Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
// file at the top-level directory of this distribution.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

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
