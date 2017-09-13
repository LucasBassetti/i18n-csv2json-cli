const fs = require('fs');

function readFile(options) {
  return new Promise((resolve, reject) => {
    const { from } = options;

    if (!/.csv$|.tsv$/.test(from)) {
      const error = 'File extension should be CSV or TSV';
      reject(error);
    }

    fs.readFile(from, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({ options, data });
      }
    });
  });
}

module.exports = readFile;
