'use strict';

var fs = require('fs');

function readFile(options) {
  return new Promise(function (resolve, reject) {
    var from = options.from;


    if (!/.csv$|.tsv$/.test(from)) {
      var error = 'File extension should be CSV or TSV';
      reject(error);
    }

    fs.readFile(from, { encoding: 'utf-8' }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve({ options: options, data: data });
      }
    });
  });
}

module.exports = readFile;