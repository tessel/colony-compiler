var async = require('async');
var colonyCompiler = require('./');

function all (entries, oncompiled, onfinish)
{
  var fork = require('child_process').fork;

  var COUNT = require('os').cpus().length;
  var workers = [];
  for (var i = 0; i < COUNT; i++) {
    workers.push(fork('./worker', []));
  }

  var curworkers = workers.slice();
  var q = async.queue(function (task, callback) {
    var w = curworkers.shift();
    w.once('message', function (data) {
      curworkers.push(w);
      task.compiled = data.compiled;
      setImmediate(callback, data.error);
    });
    w.send(task.source);
  }, workers.length);
  q.drain = function () {
    workers.forEach(function (worker) {
      worker.disconnect();
    })
  }

  async.each(entries, function (entry, next) {
    var task = { source: String(entry) };
    q.push(task, function (err) {
      var compiled = task.compiled;
      if (err || !compiled) {
        console.log('COMPILATION ERROR:', entry.compiled);
        return next();
      }
      colonyCompiler.toBytecode(compiled, function (err, data) {
        oncompiled(err, data, entry, next);
      })
    });
  }, onfinish);
}

module.exports = all;
