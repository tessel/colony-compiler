#!/bin/bash

cat > /tmp/line.js <<HERE
// 0
// 1
// 2
// 3
// 4
var err = new Error().stack;

var line = parseInt(err.match(/line\.js:(\d+)/)[1]);
console.log(line)
process.exit(line == 5 ? 0 : 1)
HERE

pushd /tmp > /dev/null

set -e
colony line.js
