const readFile = require('./read_file');
const parseFile = require('./parser');
const writeFile = require('./write_file');
const ora = require('ora');

const spinner = ora({
  text: 'Generating JSON file...',
  color: 'yellow',
});

function trownError(error) {
  spinner.stop();
  return console.error(error);
}

function printResult() {
  spinner.stop();
  return console.log('Files generated successfully!');
}

function csv2json({ from = 'i18n.csv', to = '', format = false }) {
  spinner.start();

  readFile({ from, to, format })
    .then(parseFile)
    .then(writeFile)
    .then(printResult)
    .catch(trownError);
}

module.exports = csv2json;
