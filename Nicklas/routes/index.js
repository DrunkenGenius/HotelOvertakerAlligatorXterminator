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

router.post('/highscores', function (req, res, next) {
	UpdateHighscores(req.body);
	res.send(JSON.stringify(myData));
});

router.post('/saveGameState', function (req, res, next) {
	////SAT TIL TRUE i app.js DA JEG IKKE KUNNE OVERFØRE OBJEKTER MED POST REQUESTS
	// ------------------IKKE UNCOMMENT-------app.use(express.urlencoded({ extended: true }));
	let obj = req.body;
	saveGameWorld(obj);
	res.send(JSON.stringify(myData));
});

router.post('/getWorld', function (req, res, next) {
	let userIndex = findIndex(req.body.username);
	if (userIndex === -1) {
		res.send(JSON.stringify("userNotInDB"));
	} else {
		res.send(JSON.stringify(myData[userIndex]));
	}

});

router.get('/highscores', function (req, res, next) {
	res.send(JSON.stringify(myData));
});

const saveGameWorld = (userInfo) => {

	const userIndex = myData.findIndex(element => element.username === userInfo.username);
	if (userIndex != -1) {
		myData[userIndex] = userInfo;
	} else {
		myData.push(userInfo)
	}
	fs.writeFileSync('highscores.json', JSON.stringify(myData));

	return myData;
}


const UpdateHighscores = (userInfo) => {

	const userIndex = findIndex(userInfo.username);
	let currentHS = 0;

	if (userIndex != -1) {
		currentHS = myData[userIndex].bestScore;
	}
	const newScore = userInfo.bestScore;

	console.log(`Userindex: ${userIndex}, CurrentHS: ${currentHS}, newScore: ${newScore}`);

	if (userIndex !== -1 && newScore > currentHS) {
		console.log("Gg");
		myData[userIndex].bestScore = newScore;
		fs.writeFileSync('highscores.json', JSON.stringify(myData));
		return myData;
	} else if (userIndex === -1) {
		myData.push(userInfo);
		fs.writeFileSync('highscores.json', JSON.stringify(myData));
		return myData;
	}
	return myData;
}

module.exports = router;
function findIndex(username) {
	return myData.findIndex(element => element.username === username);
}

