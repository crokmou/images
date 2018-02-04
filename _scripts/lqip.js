'use strict';

const lqip = require('lqip');
const fs   = require('fs');

function getFiles (dir, files_){
  files_ = files_ || [];
  const files = fs.readdirSync(dir);
  for (const i in files){
    const name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()){
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}
getFiles('i').map((file) => {
  if(!/\.gif/.test(file)) {
    lqip.base64(file).then(res => {
      console.log(res.replace(/^data:image\/(png|jpe?g|bmp);base64,/i, ""));
      require("fs").writeFile(file.replace('i', 'lqip'), res.replace(/^data:image\/(png|jpe?g|gif|bmp);base64,/i, ""), 'base64');
    });
  }
});
