var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const fs = require('fs');
let myData = null;

fs.readFile('highscores.json', function (err, data) {
	myData = []; // if file does not exist
	//                  -> first run
	//                     create an empty array
	if (err) {
		return; //console.error(err);
	} else {
		myData = JSON.parse(data);
	}
});

/* GET home page.*/
//Jade
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Simple Game', data: myData[0].username });
});


//router.get('/', function (req, res, next) {
//	res.render('Main.html');
//});

console.log("The dirname: " + __dirname);

router.post('/highscores', function (req, res, next) {
	UpdateHighscores(req.body);
	res.send(JSON.stringify(myData));
});

router.post('/saveGameState', function (req, res, next) {
	saveGameWorld(req.body);
	res.send(JSON.stringify(myData));
});

router.get('/getGames', function (req, res, next) {
	saveGameWorld(req.body);
	res.send(JSON.stringify(myData));
});

router.get('/highscores', function (req, res, next) {
	res.send(JSON.stringify(myData));
});

const saveGameWorld = (gameWorld) => {
	
	const userIndex = myData.findIndex(element => element.username === userInfo.username);

	myData.push(gameWorld);
	
	fs.writeFileSync( 'highscores.json', JSON.stringify(myData));
	return myData;
}

const UpdateHighscores = (userInfo) => {
	
	const userIndex = myData.findIndex(element => element.username === userInfo.username);
	let currentHS = 0;
	
	if(userIndex != -1 ){
		currentHS = myData[userIndex].bestScore;
	}
	const newScore = userInfo.bestScore;
	
	console.log(`Userindex: ${userIndex}, CurrentHS: ${currentHS}, newScore: ${newScore}`);

	if(userIndex !== -1 && newScore > currentHS){
		console.log("Gg");
		myData[userIndex].bestScore = newScore;
		fs.writeFileSync( 'highscores.json', JSON.stringify(myData));
		return myData;
	}else if(userIndex === -1){
		myData.push(userInfo);
		fs.writeFileSync( 'highscores.json', JSON.stringify(myData));
		return myData;
	}
	return myData;
}

module.exports = router;
