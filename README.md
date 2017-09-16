# i18n CSV to JSON CLI

> A CLI to convert i18n CSV/TSV files to JSON.

[![Build Status](https://travis-ci.org/LucasBassetti/i18n-csv2json-cli.svg?branch=master)](https://travis-ci.org/LucasBassetti/i18n-csv2json-cli)

### Installing

`npm install -g i18n-csv2json-cli`

### Usage

```
i18n-csv2json-cli --help

Usage: i18n-csv2json-cli [options]

Convert CSV/TSV files to JSON.

Options:

  -V, --version           output the version number
  -f, --from <file-path>  CSV/TSV file path to be converted. (Default: i18n.csv)
  -t, --to <path>         JSON path to be generated. (Default: current path)
  -F, --format            Format JSON file. (Default: false)
  -h, --help              output usage information
```

### Example

#### Command

`i18n-csv2json-cli --from i18n.csv --to locales --format`

#### Input

```
key,en,de
abc.efg.hij,test_en,test_de
abc.efg.hik,test_en2,test_de2
abc.efa,test en3,test de3
```

#### Output

```
// locales/en.i18n.json
"abc": {
  "efg": {
    "hij": "test_en",
    "hik": "test_en2"
  },
  "efa": "test en3"
}
// locales/de.i18n.json
"abc": {
  "efg": {
    "hij": "test_de",
    "hik": "test_de2"
  },
  "efa": "test de3"
}
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
