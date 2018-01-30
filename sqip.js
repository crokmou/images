'use strict';

const fs = require('fs');
const path = require('path');
const sqip = require('sqip');

const outputDir = './svg/';
const regexImgs = /\.(jpe?g|png|gif|svg)/i;

fs.readdir('./img/', function(err, files) {
  files = files.filter(f => f !== '.DS_Store');
  fs.readdir('./svg/', function(err, svgs) {
    files = files.filter((f) => {
      const fileName = f.replace(regexImgs, '');
      return !~svgs.indexOf(fileName + '.svg')
    });
    files.filter(f => f !== '.DS_Store').map(f => {
      const result =  sqip({
        filename: './img/'+f,
        numberOfPrimitives: 8
      });
      console.log(f + ': ' + result.final_svg);
      if (fs.existsSync(outputDir) || fs.mkdirSync(outputDir)) {
        fs.writeFileSync(path.join(outputDir, f.replace(regexImgs, '.svg')), result.final_svg);
      }
    })
  })
});