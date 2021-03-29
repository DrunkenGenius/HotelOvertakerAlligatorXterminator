class enemyClass {


    constructor() {
        this.level = this.enemyLevel();
        this.name = this.nameGenerator();
        this.damage = this.damageGenerator();
        this.loot = this.loot();
        this.hp = this.healthGenerator();
        this.xp = this.experience();
    }

    experience() {
        let exp = Math.round(this.name.length * this.level);
        return exp;
    }

    healthGenerator() {
        //let length = parseInt(this.name.length, 10);
        let hp = Math.round(this.name.length * this.level * 1.5);
        return hp;
    }

    loot() {
        let foodloot = new foodClass();
        let weaponloot;
        if (this.getRandomInt(3) <= 1)
            weaponloot = new weaponClass();
        let enemyLootArray = [];
        return enemyLootArray = [foodloot, weaponloot];
    }

    enemyLevel() {
        let level;
        let num = this.getRandomInt(3);
        if (num <= 1)
            level = 1; //skal være playerClass.level ;
        else if (num > 1)
            level = this.getRandomInt(15) + 1;
        return level;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    nameGenerator() {

        let firstNameArray = ['Two Legged', 'Drippling', 'Bloody', 'Green', 'Ugly', 'Orange', 'Silly', 'Oiled', 'Retarded', 'Flimsy',
            'Fat', 'Strange', 'Beautiful', 'Soft', 'Hard', 'Jealous', 'Annoying', 'Spongy', 'Depressed', 'Sexy', 'Horny', 'Rubber',
            'Metal', 'Very Hard', 'Very Soft', 'Lonely', 'Sick', 'French', 'Spanish', 'Danish', 'Delicious', 'Sticky',
            'Moist'
        ];
        let thirdNameArray = ['Lizard', 'Alligator', 'Crocodile', 'Snake', 'Zuckerberg Lizard Lord'];

        let name1 = firstNameArray[this.getRandomInt(firstNameArray.length)] + ' ';
        let name2 = '';


        if (this.getRandomInt(2) > 0) {
            name2 = 'and ' + firstNameArray[this.getRandomInt(firstNameArray.length)] + ' ';
        }

        let name3 = thirdNameArray[this.getRandomInt(thirdNameArray.length)];

        let name = name1 + name2 + name3;
        return name;
    }

    damageGenerator() {
        let damage = Math.round(this.name.length / 3);
        return damage;
    }
}