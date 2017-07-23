const path = require('path');
const fs = require('fs');

function resolve(from, to) {
  const SOURCE_DIR = path.dirname(from);
  const target_file_name = path.basename(to);
  let files = fs.readdirSync(SOURCE_DIR);
  let resolved_path = "";

  //iterate through files and see if I can find ./util 
  files.forEach(function(file) {
    let current_file_name = path.basename(file.basename, '.js');

    //if util === util
    if (current_file_name === target_file_name) {
       // return /project/util.js
      resolved_path = path.format({ dir: SOURCE_DIR, base: file.basename });
    }
  });
  return resolved_path;
}

// resolve('/project/index.js', './util'); //project/util.js

module.exports = resolve;
