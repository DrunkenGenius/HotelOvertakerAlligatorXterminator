let world = new worldCreatorClass();
console.log(world.rooms);
let player1 = new playerClass;
console.log(player1);

let wep1 = new weaponClass;
player1.addItem(wep1);

let isFighting = false;
//___________________________________________

function printByLetter(message) {
    let i = 0;
    let interval = setInterval(function () {
        if (message.charAt(i) === "|")
            document.getElementById('status').innerHTML += '<br/>'
        else
            document.getElementById('status').innerHTML += message.charAt(i);
        i++;
        if (i > message.length) {
            clearInterval(interval);
        }
    }, 50);
}

const getEnemy = (enemyInput) => {
    let enemyIndex = parseInt(enemyInput);
    if (isNaN(enemyIndex)) {
        console.log(enemyIndex);
        while (isNaN(enemyIndex))
            enemyIndex = parseInt(prompt("Write the number of the enemy you want to attack"));

        return world.rooms[player1.location].enemies[enemyIndex];
    } else {
        return world.rooms[player1.location].enemies[enemyIndex];
    }
}

window.addEventListener('load', function () {

    const status = document.getElementById('playerStats');
    status.innerHTML = `Player hp: ${player1.hp} </br> Level: ${player1.level} </br> xp: ${player1.xp}/1 `;

    const items = document.getElementById('playerItems')
    items.innerHTML = `Player Weapon Equipped: ${player1.weapon.name}`;
    
    //if(world.rooms[player1.location].enemies.length <= 1)
    //{
    const croc1 = document.getElementById('croc1');
    croc1.innerHTML = 
    `Croc Name: ${world.rooms[player1.location].enemies[0].enemyName} </br> 
    Croc HP: ${world.rooms[player1.location].enemies[0].hp} </br> 
    Croc Level: ${world.rooms[player1.location].enemies[0].level} </br>
    Croc Damage: ${world.rooms[player1.location].enemies[0].enemyDamage} </br>`;
    //}

    //if(world.rooms[player1.location].enemies.length > 1)
    //{
    const croc2 = document.getElementById('croc2');
    croc2.innerHTML = 
    `Croc Name: ${world.rooms[player1.location].enemies[1].enemyName} </br> 
    Croc HP: ${world.rooms[player1.location].enemies[1].hp} </br> 
    Croc Level: ${world.rooms[player1.location].enemies[1].level} </br>
    Croc Damage: ${world.rooms[player1.location].enemies[1].enemyDamage} </br>`;
    //}

    const enterBtn = document.getElementById('enterBtn');
    const userInput = document.getElementById('userInput');

    enterBtn.addEventListener('click', function () {
        const gamePlay = document.getElementById('gamePlay');
        gamePlay.innerHTML = `You try to ${userInput.value}: `;

        //Split input string
        let input = userInput.value.split(' ');
        let command = input[0];
        let variable = input[1];

        switch (command.toUpperCase()) {
            case 'SEARCH': {
                if (player1.location == 0) {
                    gamePlay.innerHTML +=
                        '<br/>You are in room:           ' + world.rooms[0].name +
                        '<br/>The room to your left is:  ' + world.rooms[2].name +
                        '<br/>The room to your right is: ' + world.rooms[1].name;
                    //'<br/>' + world.rooms[player1.location].enemies.length + ' hungry ememies are looking at you!';
                } else if (player1.location == 1) {
                    gamePlay.innerHTML +=
                        '<br/>You are in room:           ' + world.rooms[1].name +
                        '<br/>The room to your left is:  ' + world.rooms[0].name +
                        '<br/>The room to your right is: ' + world.rooms[2].name;
                } else {
                    gamePlay.innerHTML +=
                        '<br/>You are in room:           ' + world.rooms[2].name +
                        '<br/>The room to your left is:  ' + world.rooms[1].name +
                        '<br/>The room to your right is: ' + world.rooms[0].name;
                }
            }
            break;

        case 'ATTACK': {
            isFighting = true;
            let enemy = getEnemy(variable);
            console.log(enemy);
            printByLetter(`| You slowly walk towards your enemy. | You pull out: ${player1.weapon.name} | Enemy ${enemy.enemyName} Level: ${enemy.level} `);


            while (player1.hp >= 0 && enemy.hp >= 0 && isFighting == true) {
                console.log('Fight loop');
                printByLetter(`${enemy.enemyName} hits you for ${enemy.enemyDamage}`);
                player1.hp -= enemy.enemyDamage;
                console.log(player1.hp);
                //task(i);
                printByLetter(`${player1.enemyName} hits ${enemy.enemyName}  for ${player1.enemyDamage}`);
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

        }

        default: {
            gamePlay.innerHTML += '<br/>...command not recognized...';
        }
        }
    });

});