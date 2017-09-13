const fs = require('fs');

function writeFile({ options, files, result }) {
  return new Promise((resolve) => {
    const { to, format } = options;
    let toPath = to;

    // add slash if dont exist
    if (toPath.length > 0 && toPath[toPath.length - 1] !== '/') {
      toPath = `${toPath}/`;
    }

    // create directory if not exists
    if (toPath.length > 0 && !fs.existsSync(toPath)) {
      fs.mkdirSync(toPath);
    }

    for (let i = 1, len = files.length; i < len; i += 1) {
      const key = files[i];
      const fileContent = format ?
        JSON.stringify(result[key], null, 2) :
        JSON.stringify(result[key]);
      const fileName = `${key}.i18n.json`;
      const filePath = `${toPath}${fileName}`;

      fs.writeFile(filePath, fileContent, () => {
        if (i === len - 1) {
          resolve();
        }
      });
    }
  });
}

module.exports = writeFile;
