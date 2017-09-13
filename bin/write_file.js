'use strict';

var fs = require('fs');

function writeFile(_ref) {
  var options = _ref.options,
      files = _ref.files,
      result = _ref.result;

  return new Promise(function (resolve) {
    var to = options.to,
        format = options.format;

    var toPath = to;

    // add slash if dont exist
    if (toPath.length > 0 && toPath[toPath.length - 1] !== '/') {
      toPath = toPath + '/';
    }

    // create directory if not exists
    if (toPath.length > 0 && !fs.existsSync(toPath)) {
      fs.mkdirSync(toPath);
    }

    var _loop = function _loop(i, len) {
      var key = files[i];
      var fileContent = format ? JSON.stringify(result[key], null, 2) : JSON.stringify(result[key]);
      var fileName = key + '.i18n.json';
      var filePath = '' + toPath + fileName;

      fs.writeFile(filePath, fileContent, function () {
        if (i === len - 1) {
          resolve();
        }
      });
    };

    for (var i = 1, len = files.length; i < len; i += 1) {
      _loop(i, len);
    }
  });
}

module.exports = writeFile;