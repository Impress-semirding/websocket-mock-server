const fs = require('fs');
const Promise = require("bluebird");

function chains(action, options) {
  return new Promise((resolve, reject) => {
    let params = Array.prototype.slice.call(arguments);
    const length = arguments.length;
    // const funcs = arguments[length-1];
    const pros = {
      resolve,
      reject,
    }
    params.push((err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log(data);
        resolve(data);
      }
    })
    params = params.slice(1);console.log(params);
    action.apply(null, params);
  })  
}

function  readJsonFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  });
}

function writeJsonFile(path, data) {
  return new Promise((resolve, reject) => {
    console.log(path);
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(exists)
      }
    })
  });
}

function exists(path) {
  return new Promise((resolve, reject) => {
    console.log(path);
    fs.exists(path, (exists, err) => {
      resolve(exists)
      if (err) {
        reject();
      }
    })
  });
}

module.exports = {
  readJsonFile,
  writeJsonFile,
  exists
}