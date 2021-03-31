class playerClass {

    constructor() {
        this.name = this.nameGenerator();
        this.hp = 100;
        this.xp = 0;
        this.level = 1;
        this.weapon = new weaponClass();
        this.inventory = [];
        this.location = 0;
        this.damage = this.damage;
        this.levelreq = 10;

    }

    damage(){
        let wepdmg = this.weapon.damage;
        return wepdmg;
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

    setXPreq(req){
        this.levelreq += req;
    }

    setexperience(exp){
        this.xp += exp;
        if (this.xp >  this.levelreq){
            this.setlevel(1);
            this.xp = 0;
        }
        
    }
    
    setlevel(lvl){
        this.level += lvl;
    }

    inventory(){
        let items;
        return items;
    }

    addItem(theItem) {
        this.inventory.push(theItem);
    }
    
    removeItem(theItem) {
        this.inventory.splice(theItem, 1);
    }

  
}