let username = prompt("What is your name human?");
let world = new worldCreatorClass();
let player1 = new playerClass;
getWorld();
let wep1 = new weaponClass;
player1.addItem(wep1);

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
        index = findIndexByName(input, world.rooms[player1.location].enemies);
        console.log(index);
        while (world.rooms[player1.location].enemies[index] === undefined) {
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

window.addEventListener('load', function () {
    playerRefreshStats();
    

    const enterBtn = document.getElementById('enterBtn');
    const userInput = document.getElementById('userInput');

    enterBtn.addEventListener('click', function () {
        GameLoop(userInput, status);
    });
    document.addEventListener('keypress', enterKey);

    function enterKey(event) {
        console.log(event.code);
        //event.preventDefault();
        if (event.code == "Enter") {
            GameLoop(userInput, status);
        }
    }


    
});


function GameLoop(userInput, status) {
    const gamePlay = document.getElementById('gamePlay');

    //Split input string
    let input = userInput.value.split(' ');
    let command = input[0];
    let variable = userInput.value.split(command + " ")[1];

    switch (command.toUpperCase()) {
        case 'SEARCH': {
            gamePlay.innerHTML = "";
            //Find index af de to rum vi ikke er i. Her bruges % modulus
            let curRoomIndex = player1.location;
            let nextRoomIndex = (player1.location + 1) % 3;
            let lasRoomIndex = (player1.location + 2) % 3;

            //Hvad rummet hedder og hvilke rum der er i det
            let searchString = `You look around in ${world.rooms[curRoomIndex].name}... The room connects to two other rooms in the Hotel: | 
                    ${nextRoomIndex}: ${world.rooms[nextRoomIndex].name} |
                    ${lasRoomIndex}: ${world.rooms[lasRoomIndex].name}   |`;
            //Hvis der er enemies i rummed tilføjes de til stringen
            if (world.rooms[curRoomIndex].enemies.length > 0) {
                console.log("GG");
                searchString += `Scary foes lurks in the room: | `;
                world.rooms[curRoomIndex].enemies.forEach((enemy, index) => {
                    searchString += `${index}: ${enemy.name}.. a level ${enemy.level} alligator |`;
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
                    alert('YOU LOST');
                }
                else if (enemy.hp <= 0) {
                    let defeatString = `${enemy.name} was defeated. It dropped: |`;

                    //Fjern items fra enemy og placer i room
                    items = enemy.dropLoot();
                    items.forEach((element, i) => {
                        world.rooms[player1.location].addLoot(element);
                        defeatString += `${i}: ${JSON.stringify(element)}`
                    });


                    printByLetter(defeatString);
                    player1.setexperience(enemy.xp);
                    player1.setXPreq(100);
                    playerRefreshStats();
                    let enemyIndex = findIndexByName(enemy.name, world.rooms[player1.location].enemies);

                    console.log(world.rooms[player1.location].loot)
                    world.rooms[player1.location].enemies.splice(enemyIndex, 1);
                    UpdateCrocStatus();
                }


            }


        }
            break;

        case 'LOOT': {
            let loot;
            if (variable === undefined) {
                printByLetter(`On the floor lies: ${JSON.stringify(world.rooms[player1.location].loot)}`)
            } else {
                loot = findInArrayByInput(variable, world.rooms[player1.location].loot, true, "this item has not been found. Write it's name or number");
                player1.addItem(loot);
            }
        }
            break;

        case 'DROP ITEM': {
            player1.removeItem();

        }
            break;

        case 'FLEE': {
            if (isFighting == true) {
                isFighting = false;
                printByLetter(` You fled from the enemy, prideless and weak`);
            }
            else
                printByLetter(` You fled from a weird inhuman sound, it was your own fart. | Shame on you.`);

        }

        
            break;

            case 'EQUIP' : {
                player1.equipWeapon();
                playerRefreshStats()
            }

            break;

            case 'EAT' : {
                if (player1.food > 0 ){
                player1.eat();
                printByLetter('You eat and gain 10 HP');
                playerRefreshStats();
                }
                else
                printByLetter('You have no more food.')
                
            }

            break;


        case 'GOTO': {
            let roomIndex = findInArrayByInput(variable, world.rooms, false, "this room has not been found. Write it's name or number");
            player1.location = roomIndex;
            printByLetter(`You have entered: ${world.rooms[roomIndex].name}`);
            break;
        }

        case 'SAVEGAME': {
            saveGameState();
            printByLetter('Saving game. . . Success');
            break;
        }

        default: {
            printByLetter('command not recognized...');
        }
    }
}

function playerRefreshStats() {
    //-------------------------------
    const status = document.getElementById('playerStats');
    const items = document.getElementById('playerItems');
    const inventory = document.getElementById('playerInventory');
    
    ///--------------------------------

    status.innerHTML = `HP: ${player1.hp} </br> Level: ${player1.level} </br> XP: ${player1.xp} / ${player1.levelreq} </br> Food: ${player1.food} `;
    items.innerHTML =  `Weapon: ${player1.weapon.name} </br> Damage: ${player1.weapon.damage}`;
    inventory.innerHTML = '';
    for (let index = 0; index < player1.inventory.length; index++) {
        inventory.innerHTML += `Item ${index}: ${player1.inventory[index].name} </br>` }
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
    } else {
        const croc1 = document.getElementById('croc1');
        croc1.innerHTML = "";

        const crocName = document.getElementById("container0");
        crocName.innerHTML = "";
    }

    if (world.rooms[player1.location].enemies[1] !== undefined) {
        const croc2 = document.getElementById('croc2');
        croc2.innerHTML =
            `HP: ${world.rooms[player1.location].enemies[1].hp} </br> 
            Level: ${world.rooms[player1.location].enemies[1].level} </br>
            Damage: ${world.rooms[player1.location].enemies[1].damage} </br>`;

        const crocName = document.getElementById("container3");
        crocName.innerHTML = `${world.rooms[player1.location].enemies[1].name}`;
    } else {
        const croc1 = document.getElementById('croc2');
        croc1.innerHTML = "";

        const crocName = document.getElementById("container3");
        crocName.innerHTML = "";
    }
}



//------------------------------------------------------------------ AJAX METHODS --------------------------------------"

const saveGameState = () => {
    let gameState = { username: username, world: world, player: player1 };
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
        data: { username: username }
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

