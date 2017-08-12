const Promise = require("bluebird");

function dePromise(action, options) {
  return Promise((resolve, reject) => {
    const arguments = Array.prototype.slice.call(arguments);
    const length = arguments.length;
    const funcs = arguments[length-1];
    const params = arguments.slice(0, length-1);
    action.apply(this, params);
  })  
}