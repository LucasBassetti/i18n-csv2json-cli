'use strict';

var readFile = require('./read_file');
var parseFile = require('./parser');
var writeFile = require('./write_file');
var ora = require('ora');

var spinner = ora({
  text: 'Generating JSON file...',
  color: 'yellow'
});

function trownError(error) {
  spinner.stop();
  return console.error(error);
}

function printResult() {
  spinner.stop();
  return console.log('Files generated successfully!');
}

function csv2json(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === undefined ? 'i18n.csv' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === undefined ? '' : _ref$to,
      _ref$format = _ref.format,
      format = _ref$format === undefined ? false : _ref$format;

  spinner.start();

  readFile({ from: from, to: to, format: format }).then(parseFile).then(writeFile).then(printResult).catch(trownError);
}

module.exports = csv2json;