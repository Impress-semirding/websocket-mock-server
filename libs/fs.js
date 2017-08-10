const fs = require('fs');
const Promise = require("bluebird");


function  readJsonFile(path) {
  return new Promise((resolve, reject) {
    fs.readFile(path, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    })
  })
}
