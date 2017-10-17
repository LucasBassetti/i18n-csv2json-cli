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
//Function that makes array out of csv file
function csvToArray (text) {
  let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
  for (l in text) {
    l = text[l];
    if ('"' === l) {
      if (s && l === p) row[i] += l;
      s = !s;
    } else if (',' === l && s) l = row[++i] = '';
    else if ('\n' === l && s) {
      if ('\r' === p) row[i] = row[i].slice(0, -1);
      row = ret[++r] = [l = '']; i = 0;
    } else row[i] += l;
    p = l;
  }
  return ret;
}

function parseFile({ options, data }) {
  return new Promise((resolve) => {
    const { from } = options;
    const splitEl = /.csv$/.test(from) ? ',' : '\t';
    const lines = csvToArray(data)
    const files = lines[0]
    const result = {};

    lines.splice(0, 1);

    for (let i = 1, len = files.length; i < len; i += 1) {
      const language = files[i];
      result[language] = {};
    }

    for (let i = 0, len = lines.length; i < len; i += 1) {
      const columns = lines[i]

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
