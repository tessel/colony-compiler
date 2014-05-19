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
