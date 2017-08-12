var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const Promise = require("bluebird");

const file = require('../libs/fs');


async function index(filePath) {
  const exists = await file.exists(filePath);

  if (exists) {
    let result = await file.readJsonFile(filePath);
    result = JSON.parse(result);
    const newData = _.assign({}, result, {
      ...result,
      url: {}
    }) 
    await file.writeJsonFile(filePath, JSON.stringify(newData, null, 2 ));
    return;
  }
  await file.writeJsonFile( filePath, JSON.stringify( {a: "a", b: "b"}, null, 2));
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  const filePath = path.join(__dirname, '../data/1.json');
  // const isExists = await index(filePath);
  await index(filePath);
  res.render('indexs', { title: 'Express' });
});

router.post('/send', function(req, res, next) {
  const reqData = req.body.data;
  const collectionName = reqData.collection;
  const keyStr = reqData.request.replace(/\s+/g,"");
  const key = JSON.stringify(keyStr);
  const value = reqData.response;
  console.log(key);
  console.log(value);
})

module.exports = router;
