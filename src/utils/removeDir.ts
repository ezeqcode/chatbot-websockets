const fs = require('fs');

function deleteDirR(path, cb) {
  let files = [];
  let curPath = '';
  console.log(path, fs);
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);

    files.forEach(function (file, index) {
      curPath = path + '/' + file;

      if (fs.lstatSync(curPath).isDirectory()) deleteDirR(curPath, cb);
      else fs.unlinkSync(curPath);
    });

    fs.rmdirSync(path);
    cb(null);
  } else {
    cb(new Error('The path passed does not exist.'));
  }
};

export default deleteDirR;
