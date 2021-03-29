let world = new worldCreatorClass();
console.log(world.rooms);
let player1 = new playerClass;
console.log(player1);

let wep1 = new weaponClass;
player1.addItem(wep1);

let isFighting = false;
//___________________________________________

function printByLetter(message) {
    let status = document.getElementById('status');
    status.innerHTML = '';
    let i = 0;
    let interval = setInterval(function () {
        if (message.charAt(i) === "|")
            status.innerHTML += '<br/>'
        else
            status.innerHTML += message.charAt(i);
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
    const status = document.getElementById('status');
    status.innerHTML = `Your status.. Player hp: 
    ${player1.hp}, xp: ${player1.xp} level ${player1.level}`;

    const enterBtn = document.getElementById('enterBtn');
    const userInput = document.getElementById('userInput');

    enterBtn.addEventListener('click', function () {
        //Split input string
        let input = userInput.value.split(' ');
        let command = input[0];
        let variable = userInput.value.split(command + " ")[1];
        console.log(variable);

        switch (command.toUpperCase()) {

            case 'SEARCH': {
                status.innerHTML = "";
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
            }
                break;

            case 'ATTACK': {
                isFighting = true;
                let enemy = getEnemy(variable);
                console.log(enemy);
                printByLetter(`| You slowly walk towards your enemy. | You pull out: ${player1.weapon.name} | Enemy ${enemy.name} Level: ${enemy.level} `);


                while (player1.hp >= 0 && enemy.hp >= 0 && isFighting == true) {
                    console.log('Fight loop');
                    printByLetter(`${enemy.name} hits you for ${enemy.enemyDamage}`);
                    player1.hp -= enemy.enemyDamage;
                    console.log(player1.hp);
                    //task(i);
                    printByLetter(`${player1.name} hits ${enemy.name}  for ${player1.enemyDamage}`);
                    enemy.hp -= player1.damage();
                    console.log(enemy.hp);
                }
                /*function task(i) {
                    setTimeout(function() {
                        console.log(i);
                    }, 2000 * i);
                  }    */
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