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

function csvToArray(text, splitEl) {
  let p = '';
  let row = [''];
  const ret = [row];
  let i = 0;
  let r = 0;
  let s = !0;
  let line;
  for (const l in text) {
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

function parseFile({ options, data }) {
  return new Promise((resolve) => {
    const { from } = options;
    const splitEl = /.csv$/.test(from) ? ',' : '\t';
    const lines = csvToArray(data, splitEl);
    const files = lines[0];
    const result = {};

    lines.splice(0, 1);

    for (let i = 1, len = files.length; i < len; i += 1) {
      const language = files[i];
      result[language] = {};
    }

    for (let i = 0, len = lines.length; i < len; i += 1) {
      const columns = lines[i];

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
