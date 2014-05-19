#!/usr/bin/env node

var colony = require('../');
var fs = require('fs');

var out = 0;
var luacode = colony.colonize(fs.readFileSync(__dirname + '/binary/in.js', 'utf-8'));
colony.toBytecode(luacode, 'in.js', function (err, bin) {
  var cmp = fs.readFileSync(__dirname + '/binary/out.lua');
  for (var i = 0; i < Math.max(bin.length, cmp.length); i++) {
    if (bin[i] != cmp[i]) {
      console.error('mismatch:', bin[i], 'vs', cmp[i], '@', i);
      out = 1;
    }
  }
  console.error('done. exit code', out);
  process.exit(out);
})