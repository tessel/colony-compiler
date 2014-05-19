var async = require('async');

var colonyCompiler = require('./');

function all (entries, oncompiled, onfinish)
{
  var fork = require('child_process').fork;

  var COUNT = require('os').cpus().length;
  var workers = [];
  for (var i = 0; i < COUNT; i++) {
    workers.push(fork(require.resolve('./worker'), []));
  }

  var curworkers = workers.slice();
  var q = async.queue(function (task, callback) {
    var w = curworkers.shift();
    w.once('message', function (data) {
      curworkers.push(w);
      task.compiled = data.compiled;
      setImmediate(callback, data.error);
    });
    w.send(task.entry);
  }, workers.length);
  q.drain = function () {
    workers.forEach(function (worker) {
      worker.disconnect();
    })
  }

  async.each(entries, function (entry, next) {
    var task = { entry: entry };
    q.push(task, function (err) {
      var compiled = task.compiled;
      if (err || !compiled) {
        return next(err);
      }
      colonyCompiler.toBytecode(compiled, entry.path, function (err, data) {
        oncompiled(err, data, entry, next);
      })
    });
  }, onfinish);
}

module.exports = all;
