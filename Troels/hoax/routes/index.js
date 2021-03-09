var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const fs = require('fs');
let myData = null;

fs.readFile('highscores.json', function(err, data) {
	myData = []; // if file does not exist
	//                  -> first run
	//                     create an empty array
	if (err) {
		return; //console.error(err);
	} else {
		myData = JSON.parse(data);
	}

	console.log(myData);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Simple Game', data: myData[0].username});
});

router.post('/highscores', function(req, res, next) {
  console.log(req.body);
  res.send(JSON.stringify(myData));
});

module.exports = router;
