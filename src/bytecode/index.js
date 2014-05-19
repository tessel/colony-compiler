var binding = require('bindings')('colony_compiler_bytecode');

exports.compile = function (luacode, name, next)
{
	// var colony = require('./compile_lua');
	// colony.print = function (arg) {
	// }
	// var go = colony.cwrap('go_for_it', 'number', ['string', 'number', 'string']);

	// var bufs = [];
	// global.COLONY_OUTPUT = function (arg) {
	// 	bufs.push(new Buffer([arg]));
	// };
	// global.COLONY_SOURCEMAP = function (i) {
	// 	if (!luacode.sourcemap) {
	// 		return i;
	// 	}
	// 	return luacode.sourcemap[i-1] || luacode.sourcemap[luacode.sourcemap.length - 1];
	// };

	// var res = go(luacode.source, luacode.source.length, name);
	// if (res) {
	// 	throw new Error('Bytecode compilation failed with error code ' + res);
	// }

	// delete require.cache[require.resolve('./compile_lua')];
	// return Buffer.concat(bufs);

	// var compiler = spawn(__dirname + '/../../build/Release/colony-lua', []);
	// // compiler.stdout.setEncoding(null);
	// compiler.stdin.write(luacode.source);
	// compiler.stdin.end();
	// var bufs = [];
	// compiler.stdout.on('data', function (data) {
	// 	bufs.push(data);
	// });
	// compiler.on('exit', function (code) {
	// 	if (code) {
	// 		throw new Error('Bytecode compilation failed with error code ' + ret.code);
	// 	}
	// });
	// compiler.stdout.on('close', function () {
	// 	var hex = Buffer.concat(bufs).toString();
	// 	try {
	// 		next(null, new Buffer(hex, 'hex'));
	// 	} catch (e) {
	// 		console.log(hex);
	// 		throw new Error('ERROR');
	// 	}
	// });

	var ret = binding.Compile(luacode.source, name)
	if (typeof ret == 'number') {
		next(ret);
	} else {
		next(null, ret);
	}

	// console.error((new Error).stack)
	// console.error(typeof ret.output)
	// return ret.output;
}