'use strict';
const fs = require('fs');
const sharp = require('sharp');

const files = getFiles('i', true);
const p14 = getFiles('i/p14');
const p750 = getFiles('i/p750');
const p750x450 = getFiles('i/p750x450');

files.map((file) => {
  if(p14.map((f) => f.name).indexOf(file.name) === -1) {
    const folder = 'i/p14/';
    if (fs.existsSync(folder) || fs.mkdirSync(folder)) {
      sharp(file.path)
      .resize(14)
      .toFile(folder + '' + file.name);
    }
  }
  if(p750.map((f) => f.name).indexOf(file.name) === -1) {
    const folder = 'i/p750/';
    if (fs.existsSync(folder) || fs.mkdirSync(folder)) {
      sharp(file.path).resize(750).toFile(folder + '' + file.name);
    }
  }
  if(p750x450.map((f) => f.name).indexOf(file.name) === -1) {
    const folder = 'i/p750x450/';
    if (fs.existsSync(folder) || fs.mkdirSync(folder)) {
      sharp(file.path).resize(750, 450).toFile(folder + '' + file.name).then(()=> {
        if (fs.existsSync(folder + 'p14/') || fs.mkdirSync(folder + 'p14/')) {
          sharp(file.path.replace('i/', folder)).
          resize(14).toFile(folder + 'p14/' + file.name)
        }
      });
    }
  }
});
function getFiles (dir, folderOnly, files_){
  files_ = files_ || [];
  const files = fs.existsSync(dir) && fs.readdirSync(dir);
  for (const i in files){
    const path = dir + '/' + files[i];
    if (fs.statSync(path).isDirectory()){
      if(!folderOnly) {
        getFiles(path, null, files_);
      }
    } else {
      files_.push({path, name: files[i]});
    }
  }
  return files_.filter((f) => !/\.DS_Store/.test(f.name));
}

