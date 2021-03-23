let world = new worldCreatorClass();
console.log(world.rooms);
let player1 = new playerClass;
//console.log(player1);

let wep1 = new weaponClass;
player1.addItem(wep1);

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


window.addEventListener('load', function () {

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
                printByLetter('<br/>Hello world, bonjour le monde.');
            }
            break;

        case 'ATTACK 0': {
            let enemy = world.rooms[player1.location].enemies[0];
            console.log(enemy);
            printByLetter(`| You slowly walk towards your enemy. | You pull out: ${player1.weapon.name} | Enemy ${enemy.enemyName} Level: ${enemy.level} `);
            
            /*while (player1.hp >= 0 || enemy.hp >= 0){
                setTimeout(1000);
                printByLetter(`${enemy.enemyName} hits you for ${enemy.enemyDamage}`);
                player1.hp -= enemy.enemyDamage;

            }
            
            */
            
        }
        break;

        case 'ATTACK 1': {
            printByLetter(`You slowly walk towards your enemy. | You pull out: ${player1.weapon.name}`);
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

});