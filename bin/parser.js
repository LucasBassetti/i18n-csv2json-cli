'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function stringToObj(path, value, obj) {
  var parts = path.split('.');
  var part = void 0;
  var last = parts.pop();

  while (part = parts.shift()) {
    if (_typeof(obj[part]) !== 'object') {
      obj[part] = {};
    }
    obj = obj[part];
  }

  obj[last] = value;
}

function parseFile(_ref) {
  var options = _ref.options,
      data = _ref.data;

  return new Promise(function (resolve) {
    var from = options.from;

    var splitEl = /.csv$/.test(from) ? ',' : '\t';
    var lines = data.split('\n').map(function (line) {
      return line.replace(/(\r|'|")/g, '');
    });
    var files = lines[0].split(splitEl);
    var result = {};

    lines.splice(0, 1);

    for (var i = 1, len = files.length; i < len; i += 1) {
      var language = files[i];
      result[language] = {};
    }

    for (var _i = 0, _len = lines.length; _i < _len; _i += 1) {
      var columns = lines[_i].split(splitEl);

      for (var j = 1, jlen = columns.length; j < jlen; j += 1) {
        var key = columns[0];
        var column = columns[j];
        var _language = files[j];

        stringToObj(key, column, result[_language]);
      }
    }

    resolve({ options: options, files: files, result: result });
  });
}

module.exports = parseFile;