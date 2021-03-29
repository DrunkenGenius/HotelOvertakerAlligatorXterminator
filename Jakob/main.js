let world = new worldCreatorClass();
console.log(world.rooms[0].enemies);
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



    const status = document.getElementById('status');
    status.innerHTML = `Your status.. Player hp: 
    ${player1.hp}, xp: ${player1.xp} level ${player1.level}`;

    const enterBtn = document.getElementById('enterBtn');
    const userInput = document.getElementById('userInput');

    enterBtn.addEventListener('click', function () {
        status.innerHTML = `Your status.. Player hp: 
            ${player1.hp}, xp: ${player1.xp} level ${player1.level}`;

        //Split input string
        let input = userInput.value.split(' ');
        let command = input[0];
        let variable = input[1];

        switch (command.toUpperCase()) {
            case 'SEARCH': {
                if (player1.location == 0) {
                    status.innerHTML +=
                        '<br/>You are in room:           ' + world.rooms[0].name +
                        '<br/>The room to your left is:  ' + world.rooms[2].name +
                        '<br/>The room to your right is: ' + world.rooms[1].name;
                    //'<br/>' + world.rooms[player1.location].enemies.length + ' hungry ememies are looking at you!';
                } else if (player1.location == 1) {
                    status.innerHTML +=
                        '<br/>You are in room:           ' + world.rooms[1].name +
                        '<br/>The room to your left is:  ' + world.rooms[0].name +
                        '<br/>The room to your right is: ' + world.rooms[2].name;
                } else {
                    status.innerHTML +=
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
                
                printByLetter(`${enemy.enemyName} hits you for ${enemy.enemyDamage}`);
                player1.hp -= enemy.enemyDamage;
                console.log('Player HP: ' + player1.hp);

                printByLetter(`${player1.enemyName} hits ${enemy.enemyName}  for ${player1.enemyDamage}`);
                enemy.hp -= player1.damage();
                console.log('Enemy HP: ' + enemy.hp);

                if (player1.hp <= 0){
                    alert('YOU LOST');
                } 
                else if (enemy.hp <= 0){
                    console.log("You won");
                    printByLetter(`${enemy.enemyName} was defeated`);
                    player1.xp += 10;
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

        }

        default: {
            status.innerHTML += '<br/>...command not recognized...';
        }
        }
    });

});