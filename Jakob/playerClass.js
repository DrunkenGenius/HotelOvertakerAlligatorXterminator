class playerClass {

    constructor() {
        this.name = this.nameGenerator();
        this.hp = this.hp();
        this.xp = this.experience();
        this.level = this.level();
        this.weapon = [new weaponClass()];
        this.inventory = this.inventory();
    }


    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    nameGenerator() {        
        let firstNameArray = ['Drippling', 'Bloody', 'Green', 'Ugly', 'Orange', 'Silly', 'Oiled', 'Retarded', 'Flimsy',
            'Fat', 'Strange', 'Beautiful', 'Soft', 'Hard', 'Jealous', 'Annoying', 'Spongy', 'Depressed', 'Sexy', 'Horny', 'Rubber',
            'Metal', 'Very Hard', 'Very Soft', 'Lonely', 'Sick', 'French', 'Spanish', 'Danish', 'Delicious', 'Sticky', 'Moist'
        ];

        let thirdNameArray = ['Dreams', 'Soap', 'Chaos', 'Depression', 'Sadness', 'Envy', 'Sorrow', 'Jealousy', 'Many Fruits',
            'Danger', 'Poisonous Rats', 'Venom', 'Posion', 'Sir Peters Left Hand', 'Sir Peters Right Hand', 'Sir Peters Left Foot',
            'Sir Peters Right Foot', 'Sir Peters Right Ear', 'Sir Peters Nose', 'Sir Peters Willy', 'Moistness'
        ]

        let playerName = 'Sir ' + firstNameArray[this.getRandomInt(firstNameArray.length)] + ' of ' + thirdNameArray[this.getRandomInt(thirdNameArray.length)];;
        return playerName;
    }

    hp(){
        let hp = 100;
        return hp;
    }

    experience(){
        let xp = 0;
        return xp;
    }
    
    level(){
        let level = 1;
        return level;
    }

    inventory(){
        let items;
        return items;
    }

  
}

let player = new playerClass();
console.log(player);