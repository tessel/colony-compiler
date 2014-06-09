// Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
// file at the top-level directory of this distribution.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

var binding = require('bindings-shyp')('colony_compiler_bytecode');

var colonyCompiler = require('../');

exports.compile = function (luacode, name, next)
{
  var ret = binding.Compile(luacode.source, name || '=stdin', luacode.sourcemap || null)
  if (Buffer.isBuffer(ret)) {
    next(null, ret);
  } else {
    if (ret.match(/\d+ local variables\s*$/) || ret.match(/\d+ upvalues\s*$/) || ret.match(/too many syntax levels\s*$/)) {
      next(new (colonyCompiler.ColonyVMError)(ret));
    } else {
      next(new Error(ret));
    }
  }
}
