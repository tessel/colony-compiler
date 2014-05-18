

return function (_ENV, _module)
local exports, module = _module.exports, _module;


local bytecode = bytecode;
--[[0]] bytecode = require(this, ("./bytecode")); 
--[[62]] exports.colonize = require(this, ("./colonize"));
--[[105]] exports.toBytecode = (function (this, lua, f, next)
--[[154]] next = (((((_typeof(f)))==(("function")))) and {f} or {next})[1];
--[[198]] f = (((((_typeof(f)))==(("string")))) and {f} or {("usercode.js")})[1];
--[[246]] next(this, (null), bytecode:compile(lua, ((("@"))+(f))));
end);

return _module.exports;
end 
