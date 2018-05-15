'use strict';
const fs = require('fs');
const sharp = require('sharp');

const files = getFiles('i', true);
const p14 = getFiles('i/p14');
const p750 = getFiles('i/p750');
const p750x450 = getFiles('i/p750x450');
const webp = getFiles('webp', true).map(i => i.name.replace(/\.webp$/i, ''));
const wP14 = getFiles('webp/p14').map(i => i.name.replace(/\.webp$/i, ''));
const wP750 = getFiles('webp/p750').map(i => i.name.replace(/\.webp$/i, ''));
const wP750x450 = getFiles('webp/p750x450').map(i => i.name.replace(/\.webp$/i, ''));

files.map((file) => {
  if(isNotFolder(file.name)) {
    if(/.jpe?g$/.test(file.name) && !~webp.indexOf(file.name.replace(/(\.jpe?g)$/i, ''))) {
      sharp(file.path).toFile(file.path.replace(/^i\//, 'webp/').replace(/(\.jpe?g)$/i, '.webp'));
    }
    if(!~p14.map(i => i.name).indexOf(file.name) || !~wP14.indexOf(file.name.replace(/\.(jpe?g|gif|png|bmp|webp)/i, ''))) {
      const folder = 'i/p14/';
      if (fs.existsSync(folder) || fs.mkdirSync(folder)) {
        const outputPath = folder + '' + file.name;
        sharp(file.path).resize(14).toFile(outputPath);
        if( /\.jpe?g$/i.test(file.name)) {
          sharp(file.path).
          resize(14).
          toFile(
            outputPath.replace(/^i\//, 'webp/').replace(/(\.jpe?g)$/i, '.webp'));
        }
      }
    }
    if(!~p750.map(i => i.name).indexOf(file.name) || !~wP750.indexOf(file.name.replace(/\.(jpe?g|gif|png|bmp|webp)/i, ''))) {
      const folder = 'i/p750/';
      if (fs.existsSync(folder) || fs.mkdirSync(folder)) {
        const outputPath = folder + '' + file.name;
        sharp(file.path).resize(750).toFile(outputPath);
        if( /\.jpe?g$/i.test(file.name)) {
          sharp(file.path).
          resize(750).
          toFile(
            outputPath.replace(/^i\//, 'webp/').replace(/(\.jpe?g)$/i, '.webp'));
        }
      }
    }
    if(!~p750x450.map(i => i.name).indexOf(file.name) || !~wP750x450.indexOf(file.name.replace(/\.(jpe?g|gif|png|bmp|webp)/i, ''))) {
      const folder = 'i/p750x450/';
      if (fs.existsSync(folder) || fs.mkdirSync(folder)) {
        const outputPath = folder + '' + file.name;
        sharp(file.path).resize(750, 450).toFile(outputPath).then(()=> {
          if (fs.existsSync(folder + 'p14/') || fs.mkdirSync(folder + 'p14/')) {
            const outputPath = folder + 'p14/' + file.name;
            sharp(file.path.replace('i/', folder)).
            resize(14).toFile(outputPath);
            if( /\.jpe?g$/i.test(file.name)) {
              sharp(file.path.replace('i/', folder)).
              resize(14).
              toFile(outputPath.replace(/^i\//, 'webp/').
              replace(/(\.jpe?g)$/i, '.webp'));
            }
          }
        });
        if( /\.jpe?g$/i.test(file.name)) {
          sharp(file.path).resize(750, 450).toFile(outputPath.replace(/^i\//, 'webp/').replace(/(\.jpe?g)$/i, '.webp'));
        }
      }
    }
  }
});

function isNotFolder(path) {
  return !/p14|p750|p750x450/.test(path)
}
function getFiles (dir, root, files_){
  files_ = files_ || [];
  const files = fs.existsSync(dir) && fs.readdirSync(dir);
  for (const i in files){
    const path = dir + '/' + files[i];
    if (fs.statSync(path).isDirectory() && !root){
      getFiles(path, root, files_);
    } else {
      files_.push({path, name: files[i]});
    }
  }
  return files_.filter((f) => !/\.DS_Store/.test(f.name));
}

