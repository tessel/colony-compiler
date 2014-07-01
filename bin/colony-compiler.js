#!/usr/bin/env node
// Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
// file at the top-level directory of this distribution.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

var fs = require('fs')
  , colors = require('colors')
  , path = require('path')
  , optimist = require('optimist');

var colony = require('../');

var args = optimist
  .usage('Compile JavaScript to Lua.\nUsage: $0 file.js')
  .alias('e', 'evalsource').describe('e', 'Compile a line of code.')
  .alias('m', 'minify').boolean('m').describe('m', 'Compile code to bytecode.');

function cli () {
  var argv = args.argv;

  var source = argv.e;

  // Compile file.
  if (!source) {
    args.demand(1).argv;

    try {
      var file = argv._[0];
      if (!fs.existsSync(file) && fs.existsSync(file + '.js')) {
        file = file + '.js';
      }
      source = fs.readFileSync(file, 'utf-8');
    } catch (e) {
      console.error(String(e.stack).red);
      process.exit(100);
    }
  }

  var luacode = colony.colonize(source);
  if (argv.m) {
    colony.toBytecode(luacode, file, function (err, bin) {
      if (err) {
        throw err;
      }
      process.stdout.write(bin);
    })
  } else {
    console.log(luacode.source);
  }
}

if (require.main == module) {
  cli();
}
