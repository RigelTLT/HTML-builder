const fs = require("fs");
const path = require("path");
fs.readdir(path.join(__dirname, "secret-folder"), (err, data) => {
  if (err) throw err;
  data.forEach((files) => {
    const extname = path.extname(path.join(__dirname, "secret-folder", files));
    const name = path.basename(
      path.join(__dirname, "secret-folder", files),
      extname
    );

    fs.stat(path.join(__dirname, "secret-folder", files), (err, file) => {
      if (err) throw err;
      if (file.isFile()) {
        const size = file.size;
        console.log(`${name} - ${extname} - ${size}`);
      }
    });
  });
});
