let world = [new worldCreatorClass()];

let player1 = new playerClass;
//console.log(player1);

let wep1 = new weaponClass;
player1.addItem(wep1);

//___________________________________________

window.addEventListener('load', function () {

    let player = new playerClass;
    let hotel = new roomClass;

    roomDesc = {
        roomNameA: "RoomeA", items: ["chair", "Sword"],
        roomNameB: "RoomeB", items: ["chair", "Sword"]
     }

    const status = document.getElementById('status');
    status.innerHTML = 'Your status is now: ' + player.hp;

    const enterBtn = document.getElementById('enterBtn');
    const userInput = document.getElementById('userInput');

    enterBtn.addEventListener('click', function () {
            status.innerHTML = 'your status is now: ' + player.hp;

            switch (userInput.value.toUpperCase() ){
                    case 'SEARCH': {
                        let dice = Math.floor(Math.random() * 6) + 1;
                        if (dice <= 3) {
                            status.innerHTML += '<br/>you found something...';
                            dice = Math.floor(Math.random() * 6) + 1;
                            if (dice == 1) {
                                status.innerHTML += '<br/>... a rosted chicken!';
                                state.hp += Math.floor(Math.random() * 6) + 1;
                            }
                            if (dice == 2) {
                                status.innerHTML += '<br/>... some coins!';
                                state.score += Math.floor(Math.random() * 6) + 1;
                                state.xp += Math.floor(Math.random() * 6) + 1;
                            }
                            if (dice == 3) {
                                status.innerHTML += '<br/>... poisonous mushroom!';
                                state.hp -= Math.floor(Math.random() * 6) + 1;
                                state.xp += 1;
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
                            state.hp -= Math.floor(Math.random() * 6) + 1;
                            state.xp += Math.floor(Math.random() * 6) + 1;
                            state.score += Math.floor(Math.random() * 2);
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