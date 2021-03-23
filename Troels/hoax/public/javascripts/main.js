let world = new worldCreatorClass();
console.log(world.rooms[0]);
let player1 = new playerClass;
//console.log(player1);

let wep1 = new weaponClass;
player1.addItem(wep1);

//___________________________________________

function printText(yourText) {
    for (let i = 0; i < yourText.length(); i++) {

    }
}

$(document).ready(function () {

    const status = document.getElementById('status');
    status.innerHTML = `Your status.. Player hp: 
    ${player1.hp}, xp: ${player1.xp} level ${player1.level}`;

    const enterBtn = document.getElementById('enterBtn');
    const userInput = document.getElementById('userInput');

    enterBtn.addEventListener('click', function () {
        status.innerHTML = `Your status.. Player hp: 
            ${player1.hp}, xp: ${player1.xp} level ${player1.level}`;

        switch (userInput.value.toUpperCase()) {
            case 'SEARCH': {

            }
            break;

        case 'ATTACK 0': {
            status.innerHTML += '<br/>You slowly walk towards your enemy.';
            let dice = Math.floor(Math.random() * 6) + 1;
            if (dice <= 2) {
                status.innerHTML += '<br/>you killed a monster!';
                state.hp -= Math.floor(Math.random() * 6) + 1;
                state.xp += Math.floor(Math.random() * 6) + 1;
                state.score += Math.floor(Math.random() * 2);
            } else {
                status.innerHTML += '<br/>you tried to kill a monster... no luck!';
            }
        }
        break;

        case 'ATTACK 1': {
            let dice = Math.floor(Math.random() * 6) + 1;
            if (dice <= 2) {
                status.innerHTML += '<br/>you killed a monster!';
                state.hp -= Math.floor(Math.random() * 6) + 1;
                state.xp += Math.floor(Math.random() * 6) + 1;
                state.score += Math.floor(Math.random() * 2);
            } else {
                status.innerHTML += '<br/>you tried to kill a monster... no luck!';
            }
        }
        break;

        case 'LOOT': {

        }
        break;

        case 'FLEE': {

        }
        break;


        case 'GOTO': {

        }

        default: {
            status.innerHTML += '<br/>...command not recognized...';
        }
        }
    });

    //---------------------------------------------------------------------------------------------------------------------------------------------
    //HER ER NOGLE AJAX CALLS SOM SKAL CONNECTE TIL SERVER

    let username = prompt("What is your name human?");
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/getGames",
        dataType: "json"
    }).done(function (data) {
        console.log(data);
    });

    const setHighScores = (highscores) => {
        highScores.html(`<h3>Highscores</h3>`)
        const sortedArray = highscores.sort((a, b) => (a.bestScore > b.bestScore) ? -1 : 1);
        sortedArray.forEach((element) => {
            console.log("gg");
            highScores.append(`<div>User: ${element.username}       Score: ${element.bestScore}</div>`);
        })
    }

    const saveGameState = () => {
        let gameState = {
            username: username,
            world: world,
            player: player1
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/saveGameState",
            dataType: "json",
            data: gameState
        }).done(function (data) {
            setHighScores(data);
        });

    }

    const quit = () => {
        console.log(username);
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/highscores",
            dataType: "json",
            data: {
                username: username,
                bestScore: state.score
            }
        }).done(function (data) {
            setHighScores(data);
        });

        status.html('You logged out!<br/>');
        status.append('HighScore: ...' + state.score); // to do
        gameIsRunning = false;
        enterBtn.disabled = true;
    }


});