var binding = require('bindings-shyp')('colony_compiler_bytecode');

var colonyCompiler = require('../');

exports.compile = function (luacode, name, next)
{
  var ret = binding.Compile(luacode.source, name || '=stdin', luacode.sourcemap || [0])
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
