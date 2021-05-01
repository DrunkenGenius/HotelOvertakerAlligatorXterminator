//Username
let username = "";
//Active users is set in Login and disconnect
let activeUsers = [];
//Create world and player
let world =new worldCreatorClass(); 
let player1 = new playerClass; 
//Connect to socket
const socket = io.connect('localhost:3000/');

let isFighting = false;
//___________________________________________
let printInterval;

//Jeg laver en switch for at tjekke hvor vi er i programmet
// Login, ChooseRoom og Gameloop
let functionEnum = "Login";

socket.on('UpdateWorld', function (data) {
    //player2Console.innerHTML = data.message;
    const enemyActions = document.getElementById('enemyAction');
    console.log(data);
    world = data.world.world;
    enemyActions.innerHTML = `${data.message}`;
    player1 = data.world.player1;
    playerRefreshStats("UpdateOwnInfoWhenReceivingData");
    console.log(world);
});

window.addEventListener('load', function () {
    //playerRefreshStats(`${username} joined the game`);
    printByLetter("Write your username");

    const enterBtn = document.getElementById('enterBtn');
    const userInput = document.getElementById('userInput');


    socket.on('connect', function (data) {
        //Emit username to server
        console.log("Socket connected succesfully");
    });

    enterBtn.addEventListener('click', function () {
        switch (functionEnum) {
            case "Login":
                Login(userInput);
                break;
            case "ChooseRoom":
                ChooseRoom(userInput);
                break;
            case "GameLoop":
                GameLoop(userInput, status);
                break;
        }

    });

    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            switch (functionEnum) {
                case "Login":
                    Login(userInput);
                    break;
                case "ChooseRoom":
                    ChooseRoom(userInput);
                    break;
                case "GameLoop":
                    GameLoop(userInput, status);
                    break;
            }
            return false;
        }
    });
});

const createWorld = () => {
    world = new worldCreatorClass();
    player1 = new playerClass;
}

function Login(userInput) {
    //Split input string
    let input = userInput.value.split(' ');
    if (input.length > 1) {
        printByLetter("Username can not have spaces, try again");
    } else if (input.length === 1) {
        username = userInput.value;
        functionEnum = "ChooseRoom";
        socket.emit("Login", username);
    }
}

socket.on("Login", data=>{
    activeUsers = data;
    if(functionEnum =="ChooseRoom"){    
        let string = "Which user do you want to join?|";
        data.forEach(user => string+= user.username +"|");
        printByLetter(string);
    }
});

function ChooseRoom(userInput) {
    let input = userInput.value.split(' ');
    if (input.length > 1) {
        printByLetter("Username can not have spaces, try again");
        console.log("inputLegth > 1");
    } else if (input.length === 1) {
        console.log("inputLegth === 1");
        let userFound = activeUsers.filter(user => user.username === userInput.value);
        console.log(userFound);
        if(userFound.length !== 0){
            console.log("userfound");
            printByLetter(`Hello ${username}.. Welcome to Hotel Overtaker Alligator Xterminator!!!`)
            let gameState = {
                username: username,
                world: { world, player1 },
                playerToJoin: userInput.value
            }
            socket.emit("ChooseRoom", gameState);
            functionEnum = "GameLoop";
        }else{
            console.log("user not active");
            let string = "Username doesn't have an active game, try again.. Which user do you want to join?|";
            activeUsers.forEach(user => string+= user.username +"|");
            printByLetter(string);
        }     
    }
}

socket.on("ChooseRoom", data => {
    world = data.world.world;
    player1 = data.world.player1;
    
})


function GameLoop(userInput, status) {
    const gamePlay = document.getElementById('gamePlay');

    //Split input string
    let input = userInput.value.split(' ');
    let command = input[0];
    let variable = userInput.value.split(command + " ")[1];

    const enemyActions = document.getElementById('enemyAction');


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
            playerRefreshStats(`${username} searched ${world.rooms[curRoomIndex].name}`);
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
                    playerRefreshStats(`${username} was defeated by ${enemy.name}`);
                } else if (enemy.hp <= 0) {
                    let defeatString = `${enemy.name} was defeated. Check for loot? |`;


                    //Fjern items fra enemy og placer i room
                    items = enemy.loot;
                    enemy.loot = [];
                    items.forEach((element) => {
                        world.rooms[player1.location].loot.push(element);
                        //defeatString += `${i}: ${JSON.stringify(element)}`
                    });

                    printByLetter(defeatString);
                    player1.xp += enemy.xp;
                    //Vi skal fikse hvordan levels virker, da vi mister vores metoder når vi sender til server og retriever igen.
                    //player1.setXPreq();
                    let enemyIndex = findIndexByName(enemy.name, world.rooms[player1.location].enemies);

                    //console.log(world.rooms[player1.location].loot)
                    world.rooms[player1.location].enemies.splice(enemyIndex, 1);
                    UpdateCrocStatus();
                    playerRefreshStats(`${username} has killed ${enemy.name}`);
                }


            }


        }
            break;

        case 'LOOT': {
            let loot;
            if (variable === undefined) {
                printByLetter(`On the floor lies: ${JSON.stringify(world.rooms[player1.location].loot)}`)
                playerRefreshStats(`${username} looks on the floor in ${world.rooms[player1.location].name}`);
            } else {
                lootIndex = findInArrayByInput(variable, world.rooms[player1.location].loot, false, "this item has not been found. Write it's name or number");
                console.log("lootindex: " + lootIndex);
                loot = findInArrayByInput(variable, world.rooms[player1.location].loot, true, "this item has not been found. Write it's name or number");
                player1.inventory.push(loot);
                //Når et item er lootet splicer vi det ud af world.rooms.loot arrayet
                world.rooms[player1.location].loot.splice(lootIndex, 1);
                printByLetter(`You looted ${loot.name}`);
                playerRefreshStats(`${username} looted ${loot.name}`);
            }
        }
            break;

        case 'DROP': {
            let weaponIndex = findInArrayByInput(variable, player1.inventory, false, "this weapon has not been found. Write it's name or number");
            let droppedWeapon = player1.inventory.splice(weaponIndex, 1);
            console.log(droppedWeapon);
            world.rooms[player1.location].loot.push(droppedWeapon);
            printByLetter(`You dropped ${droppedWeapon.name} in the room`);
            playerRefreshStats(`${username} looted ${droppedWeapon.name} in ${world.rooms[player1.location].name}`);
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
            //player1.equipWeapon(weaponIndex);
            player1.inventory.push(player1.weapon);
            player1.weapon = player1.inventory[weaponIndex];
            player1.inventory.splice(weaponIndex, 1);

            playerRefreshStats(`${username} equipped ${player1.weapon.name}}`);
        }

            break;

        case 'EAT': {
            if (player1.food > 0) {
                player1.hp += 10;
                playerRefreshStats(`${username} eats and gains 10 hp`);
                printByLetter('You eat and gain 10 HP');
            } else
                printByLetter('You have no more food.');

        }

            break;


        case 'GOTO': {
            let roomIndex = findInArrayByInput(variable, world.rooms, false, "this room has not been found. Write it's name or number");
            player1.location = roomIndex;
            printByLetter(`You have entered: ${world.rooms[roomIndex].name}`);
            playerRefreshStats(`${username} went to ${world.rooms[roomIndex].name}}`);

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

}


function playerRefreshStats(message) {
    //Update world using socket
    //Sends Gamestate to server which should emit the data to the other player aswell as save to DB
    //We should send a message to the other player about action taken
    //Hvis vi bare skal opdatere uden at emit vores verden -- Når vi får data fra den anden spiller
    if (message !== "UpdateOwnInfoWhenReceivingData") {
        let gameState = {
            username: username,
            world: { world, player1 },
            message
        }
        
        socket.emit('UpdateWorld', gameState);
    }

    

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

function printByLetter(message) {
    clearInterval(printInterval);
    let gamePlay = document.getElementById('gamePlay');
    gamePlay.innerHTML = '';
    let i = 0;
    printInterval = setInterval(function () {
        if (message.charAt(i) === "|")
            gamePlay.innerHTML += '<br/>'
        else
            gamePlay.innerHTML += message.charAt(i);
        i++;
        if (i > message.length) {
            clearInterval(printInterval);
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