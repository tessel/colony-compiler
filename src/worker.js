var colonyCompiler = require('../');

process.on('message', function (data) {
  try {
    process.send({
      compiled: colonyCompiler.colonize(data, {})
    });
  } catch (e) {
    process.send({
      error: e.stack
    });
  }
})
