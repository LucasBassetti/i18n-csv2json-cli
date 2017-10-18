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

function csvToArray(text, splitEl) {
  var p = '';
  var row = [''];
  var ret = [row];
  var i = 0;
  var r = 0;
  var s = !0;
  var line = void 0;
  for (var l in text) {
    line = text[l];
    if (line === '"') {
      if (s && line === p) row[i] += line;
      s = !s;
    } else if (splitEl === line && s) {
      i += 1;
      row[i] = '';
      line = row[i];
    } else if (line === '\n' && s) {
      if (p === ' ===') {
        row[i] = row[i].slice(0, -1);
      }

      r += 1;
      line = '';
      ret[r] = [line];
      row = ret[r];
      i = 0;
    } else {
      row[i] += line;
    }

    p = line;
  }

  return ret;
}

function parseFile(_ref) {
  var options = _ref.options,
      data = _ref.data;

  return new Promise(function (resolve) {
    var from = options.from;

    var splitEl = /.csv$/.test(from) ? ',' : '\t';
    var lines = csvToArray(data, splitEl);
    var files = lines[0];
    var result = {};

    lines.splice(0, 1);

    for (var i = 1, len = files.length; i < len; i += 1) {
      var language = files[i];
      result[language] = {};
    }

    for (var _i = 0, _len = lines.length; _i < _len; _i += 1) {
      var columns = lines[_i];

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