exports.compile = function (luacode, name)
{
	var colony = require('./compile_lua');
	colony.print = function (arg) {
	}
	var go = colony.cwrap('go_for_it', 'number', ['string', 'number', 'string']);

	var bufs = [];
	global.COLONY_OUTPUT = function (arg) {
		bufs.push(new Buffer([arg]));
	};
	global.COLONY_SOURCEMAP = function (i) {
		if (!luacode.sourcemap) {
			return i;
		}
		return luacode.sourcemap[i-1] || luacode.sourcemap[luacode.sourcemap.length - 1];
	};

	var res = go(luacode.source, luacode.source.length, name);
	if (res) {
		throw new Error('Bytecode compilation failed with error code ' + res);
	}

	delete require.cache[require.resolve('./compile_lua')];
	return Buffer.concat(bufs);
}