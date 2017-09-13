#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package.json');
var csv2json = require('./csv2json');

program.version(pkg.version).description('Convert CSV/TSV files to JSON.').option('-f, --from <file-path>', 'CSV/TSV file path to be converted. (Default: i18n.csv)').option('-t, --to <path>', 'JSON path to be generated. (Default: current path)').option('-F, --format', 'Format JSON file. (Default: false)').parse(process.argv);

csv2json(program);