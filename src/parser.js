function stringToObj(path, value, obj) {
  const parts = path.split('.');
  let part;
  const last = parts.pop();

  while (part = parts.shift()) {
    if (typeof obj[part] !== 'object') {
      obj[part] = {};
    }
    obj = obj[part];
  }

  obj[last] = value;
}

function parseFile({ options, data }) {
  return new Promise((resolve) => {
    const { from } = options;
    const splitEl = /.csv$/.test(from) ? ',' : '\t';
    const lines = data.split('\n').map(line => line.replace(/(\r|'|")/g, ''));
    const files = lines[0].split(splitEl);
    const result = {};

    lines.splice(0, 1);

    for (let i = 1, len = files.length; i < len; i += 1) {
      const language = files[i];
      result[language] = {};
    }

    for (let i = 0, len = lines.length; i < len; i += 1) {
      const columns = lines[i].split(splitEl);

      for (let j = 1, jlen = columns.length; j < jlen; j += 1) {
        const key = columns[0];
        const column = columns[j];
        const language = files[j];

        stringToObj(key, column, result[language]);
      }
    }

    resolve({ options, files, result });
  });
}

module.exports = parseFile;
