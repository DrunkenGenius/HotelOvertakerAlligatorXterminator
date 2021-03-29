let world = new worldCreatorClass();
console.log(world.rooms[0]);

let player1 = new playerClass;
//console.log(player1);

let wep1 = new weaponClass;
player1.addItem(wep1);

//___________________________________________

window.addEventListener('load', function () {

    const status = document.getElementById('playerStats');
    status.innerHTML = `Player hp: ${player1.hp} </br> Level: ${player1.level} </br> xp: ${player1.xp}/1 `;

    const items = document.getElementById('playerItems')
    items.innerHTML = `Player Weapon Equipped: ${player1.weapon.name}`;


    const enterBtn = document.getElementById('enterBtn');
    const userInput = document.getElementById('userInput');

    enterBtn.addEventListener('click', function () {
        const gamePlay = document.getElementById('gamePlay');
        gamePlay.innerHTML = `You try to ${userInput.value}: `;
        
        switch (userInput.value.toUpperCase()) {
            case 'SEARCH': {
                for (let index = 0; index < world.rooms[player1.location].enemies.length; index++) {
                    
                }

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
            /* let dice = Math.floor(Math.random() * 6) + 1;
                        if (dice <= 3) {
                            status.innerHTML += '<br/>you found something...';
                            dice = Math.floor(Math.random() * 6) + 1;
                            if (dice == 1) {
                                status.innerHTML += '<br/>... a rosted chicken!';
                                player1.hp += Math.floor(Math.random() * 6) + 1;
                            }
                            if (dice == 2) {
                                status.innerHTML += '<br/>... some coins!';
                                player1.xp += Math.floor(Math.random() * 6) + 1;
                            }
                            if (dice == 3) {
                                status.innerHTML += '<br/>... poisonous mushroom!';
                                player1.hp -= Math.floor(Math.random() * 6) + 1;
                                player1.xp += 1;
                            }
                        } else {
                            status.innerHTML += '<br/>you found nothing.';
                        }
                    }
                    break; */
        case 'KILL': {
            let dice = Math.floor(Math.random() * 6) + 1;
            if (dice <= 2) {
                status.innerHTML += '<br/>you killed a monster!';
                player1.hp -= Math.floor(Math.random() * 6) + 1;
                player1.xp += Math.floor(Math.random() * 6) + 1;
            } else {
                status.innerHTML += '<br/>you tried to kill a monster... no luck!';
            }
        }
        break;
        default: {
            status.innerHTML += '<br/>...command not recognized...';
        }
        }
    });

});