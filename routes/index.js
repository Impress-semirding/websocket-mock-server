var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const Promise = require("bluebird");

/* GET home page. */
router.get('/', function(req, res, next) {
  const currentPath = path.join(__dirname, '../data/1.json');
  let linkBuffer = {};
  fs.exists(currentPath, function(exists) {
    if (exists) {
      const result = JSON.parse(fs.readFileSync(currentPath));
      const newData = _.assign({}, result, {
        url: {a: "a", b: "b"}
      })
      fs.writeFile( currentPath, JSON.stringify(newData, null, 2 ), 'utf8', function() {
        console.log(11);
      });
    } else {
      fs.writeFile( currentPath, JSON.stringify( {a: "a", b: "b"}, null, 2 ), 'utf8', function() {
        console.log(11);
      });
    }
  })

  res.render('indexs', { title: 'Express' });
});

router.post('/send', function(req, res, next) {
  const reqData = req.body.data;
  const keyStr = reqData.request.replace(/\s+/g,"");
  const key = JSON.stringify(keyStr);
  const value = reqData.response;
  console.log(key);
  console.log(value);
})

module.exports = router;
