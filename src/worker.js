// Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
// file at the top-level directory of this distribution.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

var colonyCompiler = require('../');

process.on('message', function (entry) {
  try {
    process.send({
      compiled: colonyCompiler.colonize(entry.source, {
      	path: entry.path
      })
    });
  } catch (e) {
    process.send({
      error: e.stack
    });
  }
})
