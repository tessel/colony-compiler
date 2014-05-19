var binding = require('bindings')('colony_compiler_bytecode');

exports.compile = function (luacode, name, next)
{
	var ret = binding.Compile(luacode.source, name || '=stdin', luacode.sourcemap || [0])
	if (typeof ret == 'number') {
		next(ret);
	} else {
		next(null, ret);
	}
}
