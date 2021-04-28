//Get Username
let username = prompt("What is your name human?");
//Create world and player
let world = new worldCreatorClass();
let player1 = new playerClass;
//Check if user already has world in DB
getWorld();
//Connect to socket
const socket = io.connect('localhost:3000/');
//Give player weapons
let wep1 = new weaponClass;
player1.addItem(wep1);
let wep2 = new weaponClass;
player1.addItem(wep2);
let wep3 = new weaponClass;
player1.addItem(wep3);

let isFighting = false;
//___________________________________________
let interval;

function printByLetter(message) {
    clearInterval(interval);
    let gamePlay = document.getElementById('gamePlay');
    gamePlay.innerHTML = '';
    let i = 0;
    interval = setInterval(function () {
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

const findInArrayByInput = (input, searchArray, returnAsObject, promptString) => {
    let index = parseInt(input);
    if (isNaN(index)) {
        index = findIndexByName(input, searchArray);
        console.log(index);
        while (searchArray[index] === undefined) {
            reply = prompt(promptString);
            if (isNaN(parseInt(reply))) {
                index = findIndexByName(reply, searchArray);
            } else {
                index = parseInt(reply);
            }
        }
        if (returnAsObject)
            return searchArray[index];
        else
            return index
    } else {
        if (returnAsObject)
            return searchArray[index];
        else
            return index
    }
}

const findIndexByName = (string, array) => {
    let index = array.findIndex(element => element.name.toUpperCase() === string.toUpperCase());
    return index;

}

socket.on('UpdateWorld', function(data) {
    player2Console.innerHTML = data.message;
    world = data.world;
    console.log(data);
});

window.addEventListener('load', function () {
    playerRefreshStats();

    const enterBtn = document.getElementById('enterBtn');
    const userInput = document.getElementById('userInput');
    

    socket.on('connect', function (data) {
        console.log("Socket connected succesfully");
    });

    enterBtn.addEventListener('click', function () {
        GameLoop(userInput, status);
    });

    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            GameLoop(userInput, status);
            return false;
        }
    });
});


function GameLoop(userInput, status) {
    const gamePlay = document.getElementById('gamePlay');

    //Split input string
    let input = userInput.value.split(' ');
    let command = input[0];
    let variable = userInput.value.split(command + " ")[1];

    const enemyActions = document.getElementById('enemyAction');
    enemyActions.innerHTML = `The other player just: ${userInput.value}`

    switch (command.toUpperCase()) {
        case 'SEARCH': {
            gamePlay.innerHTML = "";
            //Find index af de to rum vi ikke er i. Her bruges % modulus
            let curRoomIndex = player1.location;
            let nextRoomIndex = (player1.location + 1) % 3;
            let lasRoomIndex = (player1.location + 2) % 3;

            //Hvad rummet hedder og hvilke rum der er i det
            let searchString = `You look around in ${world.rooms[curRoomIndex].name}... The room connects to two other areas in the Hotel: | 
                    ${nextRoomIndex}: ${world.rooms[nextRoomIndex].name} |
                    ${lasRoomIndex}: ${world.rooms[lasRoomIndex].name}   |`;
            //Hvis der er enemies i rummed tilføjes de til stringen
            if (world.rooms[curRoomIndex].enemies.length > 0) {
                searchString += `Scary foes lurks in the room: | `;
                world.rooms[curRoomIndex].enemies.forEach((enemy, index) => {
                    searchString += `${index}: ${enemy.name}.. a level ${enemy.level} enemy |`;
                });
            }
            searchString += `What do you want to do... ?`;
            //Her printes searchString
            printByLetter(searchString);
            UpdateCrocStatus();
        }
            break;

        case 'ATTACK': {
            isFighting = true;
            let enemy = findInArrayByInput(variable, world.rooms[player1.location].enemies, true, "this enemy has not been found. Write it's name or number");
            console.log(enemy);
            printByLetter(`| You slowly walk towards your enemy. | You pull out: ${player1.weapon.name} | Enemy ${enemy.name} Level: ${enemy.level} `);

            while (player1.hp >= 0 && enemy.hp >= 0 && isFighting == true) {

                printByLetter(`${enemy.name} hits you for ${enemy.damage}`);
                player1.hp -= enemy.damage;
                console.log('Player HP: ' + player1.hp);

                printByLetter(`${player1.name} hits ${enemy.name}  for ${player1.damage}`);
                enemy.hp -= player1.damage;
                console.log('Enemy HP: ' + enemy.hp);

                if (player1.hp <= 0) {
                    printByLetter(`${player1.name} and his loyal weapon | ${player1.weapon.name} | didn't stand a chance and was defeated. You died.`)
                } else if (enemy.hp <= 0) {
                    let defeatString = `${enemy.name} was defeated. Check for loot? |`;


                    //Fjern items fra enemy og placer i room
                    items = enemy.dropLoot();
                    items.forEach((element) => {
                        world.rooms[player1.location].addLoot(element);
                        //defeatString += `${i}: ${JSON.stringify(element)}`
                    });

                    printByLetter(defeatString);
                    player1.setexperience(enemy.xp);
                    player1.setXPreq();
                    let enemyIndex = findIndexByName(enemy.name, world.rooms[player1.location].enemies);

                    //console.log(world.rooms[player1.location].loot)
                    world.rooms[player1.location].enemies.splice(enemyIndex, 1);
                    UpdateCrocStatus();
                    playerRefreshStats(`${username} has killed ${enemy}`)
                }


            }


        }
            break;

        case 'LOOT': {
            let loot;
            if (variable === undefined) {
                printByLetter(`On the floor lies: ${JSON.stringify(world.rooms[player1.location].loot)}`)
            } else {
                lootIndex = findInArrayByInput(variable, world.rooms[player1.location].loot, false, "this item has not been found. Write it's name or number");
                console.log("lootindex: " + lootIndex);
                loot = findInArrayByInput(variable, world.rooms[player1.location].loot, true, "this item has not been found. Write it's name or number");
                player1.addItem(loot);
                //Når et item er lootet splicer vi det ud af world.rooms.loot arrayet
                world.rooms[player1.location].loot.splice(lootIndex, 1);
                printByLetter(`You looted ${loot.name}`);
            }
        }
            break;

        case 'DROP': {
            let weaponIndex = findInArrayByInput(variable, player1.inventory, false, "this weapon has not been found. Write it's name or number");
            let droppedWeapon = player1.removeItem(weaponIndex);
            console.log(droppedWeapon);
            world.rooms[player1.location].loot.push(droppedWeapon);
            printByLetter(`You dropped ${droppedWeapon.name} in the room`);
        }
            break;

        case 'FLEE': { //currently not functioning. Must slow down attack loop. 
            if (isFighting == true) {
                isFighting = false;
                printByLetter(` You fled from the enemy, prideless and weak`);
            } else
                printByLetter(` You fled from a weird inhuman sound, it was your own fart. | Shame on you.`);

        }
            break;

        case 'EQUIP': {
            let weaponIndex = findInArrayByInput(variable, player1.inventory, false, "this weapon has not been found. Write it's name or number");
            player1.equipWeapon(weaponIndex);
        }

            break;

        case 'EAT': {
            if (player1.food > 0) {
                player1.eat();
                printByLetter('You eat and gain 10 HP');
            } else
                printByLetter('You have no more food.');

        }

            break;


        case 'GOTO': {
            let roomIndex = findInArrayByInput(variable, world.rooms, false, "this room has not been found. Write it's name or number");
            player1.location = roomIndex;
            printByLetter(`You have entered: ${world.rooms[roomIndex].name}`);

        }
            break;

        case 'SAVEGAME': {
            
            
            
            printByLetter('Saving game. . . Success');

        }
            break;

        default: {
            printByLetter('command not recognized...');
        }

    }
    playerRefreshStats();
}


function playerRefreshStats(message) {
    //Update world using socket
    //Sends Gamestate to server which should emit the data to the other player aswell as save to DB
    //We should send a message to the other player about action taken
    socket.emit('UpdateWorld', {username, world, message});


    //-------------------------------
    const status = document.getElementById('playerStats');
    const items = document.getElementById('playerItems');
    const inventory = document.getElementById('playerInventory');

    ///--------------------------------
    status.innerHTML = `HP: ${player1.hp} </br> Level: ${player1.level} </br> XP: ${player1.xp} / ${player1.levelreq} </br> Food: ${player1.food} `;
    items.innerHTML = `Weapon: ${player1.weapon.name} </br> Damage: ${player1.weapon.damage}`;
    inventory.innerHTML = '';
    for (let index = 0; index < player1.inventory.length; index++) {
        inventory.innerHTML += `${index}: ${player1.inventory[index].name}, ${player1.inventory[index].damage} dmg. </br>`
    }
}

function UpdateCrocStatus() {
    if (world.rooms[player1.location].enemies[0] !== undefined) {
        const croc1 = document.getElementById('croc1');
        croc1.innerHTML =
            `HP: ${world.rooms[player1.location].enemies[0].hp} </br> 
        Level: ${world.rooms[player1.location].enemies[0].level} </br>
        Damage: ${world.rooms[player1.location].enemies[0].damage} </br>`;

        const crocName = document.getElementById("container0");
        crocName.innerHTML = `${world.rooms[player1.location].enemies[0].name}`;

        const hide = document.getElementById('container0');
        hide.style.visibility = 'visible';
    } else {
        const croc1 = document.getElementById('croc1');
        croc1.innerHTML = "";

        const crocName = document.getElementById("container0");
        crocName.innerHTML = "";

        const hide = document.getElementById('container0');
        hide.style.visibility = 'hidden';
    }

    if (world.rooms[player1.location].enemies[1] !== undefined) {
        const croc2 = document.getElementById('croc2');
        croc2.innerHTML =
            `HP: ${world.rooms[player1.location].enemies[1].hp} </br> 
            Level: ${world.rooms[player1.location].enemies[1].level} </br>
            Damage: ${world.rooms[player1.location].enemies[1].damage} </br>`;

        const crocName = document.getElementById("container3");
        crocName.innerHTML = `${world.rooms[player1.location].enemies[1].name}`;

        const hide = document.getElementById('container3');
        hide.style.visibility = 'visible';
    } else {
        const croc1 = document.getElementById('croc2');
        croc1.innerHTML = "";

        const crocName = document.getElementById("container3");
        crocName.innerHTML = "";

        const hide = document.getElementById('container3');
        hide.style.visibility = 'hidden';
    }
}


//------------------------------------------------------------------ AJAX METHODS --------------------------------------"

const saveGameState = () => {
    let gameState = {
        username: username,
        world: world,
        player: player1
    };
    console.log(gameState);
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/saveGameState",
        dataType: "json",
        data: gameState
    }).done(function (data) {
        console.log("SavedState: " + data)
    });

}

function getWorld() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/getWorld",
        dataType: "json",
        data: {
            username: username
        }
    }).done(function (data) {
        console.log(data);
        if (data === "userNotInDB") {
            console.log("userNotInDB use created world");
            printByLetter(`No user was found under username: ${username}. Therefore, a new world has been created|You are:| Name: ${player1.name}|Level: ${player1.level}`);
        } else {
            world = data.world;
            player1 = data.player;
            printByLetter(`You have succesfully loaded as user: ${username}. | Name: ${player1.name}|Level: ${player1.level}`);

        }
    });
}