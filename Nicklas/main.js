let world = [new worldCreatorClass()];

let player1 = new playerClass;
//console.log(player1);

let wep1 = new weaponClass;
player1.addItem(wep1);

//___________________________________________

window.addEventListener('load', function () {

    const status = document.getElementById('status');
    status.innerHTML = `Your status.. Player hp: ${player1.hp}, xp: ${player1.xp} level ${player1.level}`;

    

    const enterBtn = document.getElementById('enterBtn');
    const userInput = document.getElementById('userInput');

    enterBtn.addEventListener('click', function () {
            status.innerHTML = `Your status.. Player hp: ${player1.hp}, xp: ${player1.xp} level ${player1.level}`;

            switch (userInput.value.toUpperCase() ){
                    case 'SEARCH': {
                        let dice = Math.floor(Math.random() * 6) + 1;
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
                    break;
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