let username = prompt("What is your name human?");
world = new worldCreatorClass();
player1 = new playerClass();


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

            case 'QUIT': {
                saveGameState();
            }

            default: {
                status.innerHTML += '<br/>...command not recognized...';
            }
        }


    });

    //HENT VERDEN FRA DATA BASE HVIS USEREN I i den
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/getWorld",
        dataType: "json",
        data: { username: username }
    }).done(function (data) {
        console.log(data);
        if (data === "userNotInDB") {
            console.log("userNotInDB use created world");
        } else {
            console.log("User in DB use world from DB");
            world = data.world
            player1 = data.player;
            //Sæt status til værdier fra verden fra DB
            status.innerHTML = `Your status.. Player hp:
            ${player1.hp}, xp: ${player1.xp} level ${player1.level}`;
        }
    });
    //---------------------------------------------------------------------------------------------------------------------------------------------
    //HER ER NOGLE AJAX CALLS SOM SKAL CONNECTE TIL SERVER



    const setHighScores = (highscores) => {
        highScores.html(`<h3>Highscores</h3>`)
        const sortedArray = highscores.sort((a, b) => (a.bestScore > b.bestScore) ? -1 : 1);
        sortedArray.forEach((element) => {
            console.log("gg");
            highScores.append(`<div>User: ${element.username}       Score: ${element.bestScore}</div>`);
        })
    }

    const saveGameState = () => {
        console.log(world.rooms);
        let gameState = { username: username, world: world, player: player1 };

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/saveGameState",
            dataType: "json",
            data: gameState
        }).done(function (data) {
            console.log("SavedState: " + data)
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