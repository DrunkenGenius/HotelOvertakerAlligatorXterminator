class enemyClass {


    constructor() {
        this.enemyName = this.nameGenerator();
        this.enemyDamage = this.damageGenerator();
        this.enemyfood = [new foodClass()];
        this.loot = [new weaponClass()];
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
        let damage = Math.round(this.enemyName.length / 3);
        return damage;
    }
}