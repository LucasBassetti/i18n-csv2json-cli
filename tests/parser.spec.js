const { expect } = require('chai');
const { describe, it } = require('mocha');
const parseFile = require('../src/parser');

const csvData = `key,en,de
abc.efg.hij,test_en,test_de
abc.efg.hik,test_en2,test_de2
abc.efa,test en3,"test, de3"`;
const tsvData = `key	en	de
abc.efg.hij	test_en	test_de
abc.efg.hik	test_en2	test_de2
abc.efa	test en3	"test, de3"`;
const resultParse = '{"en":{"abc":{"efg":{"hij":"test_en","hik":"test_en2"},"efa":"test en3"}},"de":{"abc":{"efg":{"hij":"test_de","hik":"test_de2"},"efa":"test, de3"}}}';
const csvOptions = { from: 'i18n.csv' };
const tsvOptions = { from: 'i18n.tsv' };

describe('Parser', () => {
  it('should generate a JSON from CSV file', (done) => {
    parseFile({ options: csvOptions, data: csvData }).then(({ result }) => {
      expect(JSON.stringify(result)).to.be.equals(resultParse);
      done();
    });
  });

  it('should generate a JSON from TSV file', (done) => {
    parseFile({ options: tsvOptions, data: tsvData }).then(({ result }) => {
      expect(JSON.stringify(result)).to.be.equals(resultParse);
      done();
    });
  });
});
