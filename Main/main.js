let world = new worldCreatorClass();
console.log(world.rooms[0].enemies);
let player1 = new playerClass;
console.log(player1);

let wep1 = new weaponClass;
player1.addItem(wep1);

let isFighting = false;
//___________________________________________

function printByLetter(message) {
    let gamePlay = document.getElementById('gamePlay');
    gamePlay.innerHTML = '';
    let i = 0;
    let interval = setInterval(function () {
        if (message.charAt(i) === "|")
            gamePlay.innerHTML += '<br/>'
        else
            gamePlay.innerHTML += message.charAt(i);
        i++;
        if (i > message.length) {
            clearInterval(interval);
        }
    }, 50);
}

const getEnemy = (enemyInput) => {
    let enemyIndex = parseInt(enemyInput);
    if (isNaN(enemyIndex)) {
        enemyIndex = findIndexByName(enemyInput, world.rooms[player1.location].enemies);
        console.log(enemyIndex);
        while (world.rooms[player1.location].enemies[enemyIndex] === undefined) {
            reply = prompt("Enemy not recognized.. Write Number or name of enemy");
            if (isNaN(parseInt(reply))) {
                enemyIndex = findIndexByName(reply, world.rooms[player1.location].enemies);
            } else {
                enemyIndex = parseInt(reply);
            }
        }
        return world.rooms[player1.location].enemies[enemyIndex];
    } else {
        return world.rooms[player1.location].enemies[enemyIndex];
    }
}

const getRoom = (roomInput) => {
    let roomIndex = parseInt(roomInput);
    if (isNaN(roomIndex)) {
        roomIndex = findIndexByName(roomInput, world.rooms);
        console.log(roomIndex);
        while (world.rooms[roomIndex] === undefined) {
            reply = prompt("Room not recognized.. Write Number or name of room");
            if (isNaN(parseInt(reply))) {
                roomIndex = findIndexByName(reply, world.rooms);
            } else {
                roomIndex = parseInt(reply);
            }
        }
        return roomIndex;
    } else {
        return roomIndex;
    }
}

const findIndexByName = (string, array) => {
    let index = array.findIndex(element => element.name.toUpperCase() === string.toUpperCase());
    return index;

}

window.addEventListener('load', function () {

    const status = document.getElementById('playerStats');
    status.innerHTML = `HP: ${player1.hp} </br> Level: ${player1.level} </br> xp: ${player1.xp} / ${player1.levelreq}  `;

    const items = document.getElementById('playerItems')
    items.innerHTML = 
    `Weapon Equipped: ${player1.weapon.name} </br> 
    Weapon Damage: ${player1.weapon.damage}`;

    const enterBtn = document.getElementById('enterBtn');
    const userInput = document.getElementById('userInput');

    enterBtn.addEventListener('click', function () {
        const gamePlay = document.getElementById('gamePlay');
        gamePlay.innerHTML = `You try to ${userInput.value}: `;

        //Split input string
        let input = userInput.value.split(' ');
        let command = input[0];
        let variable = userInput.value.split(command + " ")[1];

        switch (command.toUpperCase()) {
            case 'SEARCH': {
                gamePlay.innerHTML = "";
                let curRoomIndex = player1.location;
                let nextRoomIndex = (player1.location + 1) % 3;
                let lasRoomIndex = (player1.location + 2) % 3;

                let searchString = `You look around in ${world.rooms[curRoomIndex].name}... The room connects to two other rooms in the Hotel: | 
                    ${nextRoomIndex}: ${world.rooms[nextRoomIndex].name} |
                    ${lasRoomIndex}: ${world.rooms[lasRoomIndex].name}   |`;

                if (world.rooms[curRoomIndex].enemies.length > 0) {
                    console.log("GG");
                    searchString += `Scary foes lurks in the room: | `;
                    world.rooms[curRoomIndex].enemies.forEach((enemy, index) => {
                        searchString += `${index}: ${enemy.name}.. a level ${enemy.level} alligator |`
                    });
                }
                searchString += `What do you want to do... ?`
                printByLetter(searchString);
                ShowCrocs();
            }
                break;

            case 'ATTACK': {

                isFighting = true;
                let enemy = getEnemy(variable);
                console.log(enemy);
                printByLetter(`| You slowly walk towards your enemy. | You pull out: ${player1.weapon.name} | Enemy ${enemy.name} Level: ${enemy.level} `);

                while (player1.hp >= 0 && enemy.hp >= 0 && isFighting == true) {

                    printByLetter(`${enemy.name} hits you for ${enemy.damage}`);
                    player1.hp -= enemy.damage;
                    console.log('Player HP: ' + player1.hp);

                    printByLetter(`${player1.name} hits ${enemy.name}  for ${player1.damage}`);
                    enemy.hp -= player1.damage();
                    console.log('Enemy HP: ' + enemy.hp);

                    if (player1.hp <= 0) {
                        alert('YOU LOST');
                    }
                    else if (enemy.hp <= 0) {
                        printByLetter(`${enemy.name} was defeated`);
                        player1.setexperience(enemy.xp);
                        player1.setXPreq(100);
                        status.innerHTML = `Player hp: ${player1.hp} </br> Level: ${player1.level} </br> xp: ${player1.xp} / ${player1.levelreq} `;
                    }


                }


            }
                break;

            case 'LOOT': {

            }
                break;

            case 'DROP ITEM': {

            }
                break;

            case 'FLEE': {
                if (isFighting == true) {
                    isFighting = false;
                    printByLetter(` You fled from the enemy, prideless and weak`)
                } else
                    printByLetter(` You fled from a weird inhuman sound, it was your own fart. | Shame on you.`)

            }
                break;


            case 'GOTO': {
                let roomIndex = getRoom(variable);
                player1.location = roomIndex;
                printByLetter(`You have entered: ${world.rooms[roomIndex].name}`);
                break;
            }

            default: {
                printByLetter('command not recognized...');
            }
        }
    });

});


function ShowCrocs() {
    if (world.rooms[player1.location].enemies.length >= 1) {
        
        const croc1 = document.getElementById('croc1');
        croc1.innerHTML =
            `HP: ${world.rooms[player1.location].enemies[0].hp} </br> 
    Level: ${world.rooms[player1.location].enemies[0].level} </br>
    Damage: ${world.rooms[player1.location].enemies[0].damage} </br>`;

        const crocName = document.getElementById("container0");
        crocName.innerHTML = `${world.rooms[player1.location].enemies[0].name}`;
    }

    if (world.rooms[player1.location].enemies.length === 2) {
        const croc2 = document.getElementById('croc2');
        croc2.innerHTML =
            `HP: ${world.rooms[player1.location].enemies[1].hp} </br> 
    Level: ${world.rooms[player1.location].enemies[1].level} </br>
    Damage: ${world.rooms[player1.location].enemies[1].damage} </br>`;

    const crocName = document.getElementById("container3");
        crocName.innerHTML = `${world.rooms[player1.location].enemies[1].name}`;
    }
}
