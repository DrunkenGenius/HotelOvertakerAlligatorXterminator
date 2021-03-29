class weaponClass {


    constructor() {
        this.name = this.nameGenerator();
        this.damage = this.damageGenerator();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    nameGenerator() {

        let firstNameArray = ['Drippling', 'Bloody', 'Green', 'Ugly', 'Orange', 'Silly', 'Oiled', 'Retarded', 'Flimsy',
            'Fat', 'Strange', 'Beautiful', 'Soft', 'Hard', 'Jealous', 'Annoying', 'Spongy', 'Depressed', 'Sexy', 'Horny', 'Rubber',
            'Metal', 'Very Hard', 'Very Soft', 'Lonely', 'Sick', 'French', 'Spanish', 'Danish', 'Delicious', 'Sticky', 'Moist'];
        let secondNameArray = ['Sword', 'Dagger', 'Stick', 'Claymore', 'Butterknife', 'Chainsaw', 'saw',
            'Longsword', 'Chain', 'Morningstar', 'Mouse', 'Deer Antler', 'Rotten Hand', 'Short Sword', 'Banana', 'Apple',
            'Bat', 'Fork', 'Spoon', 'Cup', 'Table leg', 'Guitar', 'Brick', 'Piece of Glass', 'Wierdly Stiff Towel',
            'Wierdly Stiff Sock', 'Flask', 'Bottle', 'Shelf', 'Refridgerater', 'Glove', 'Piece of Cardboard', 'Piece of Chocolate'];
        let thirdNameArray = ['Dreams', 'Soap', 'Chaos', 'Depression', 'Sadness', 'Envy', 'Sorrow', 'Jealousy', 'Many Fruits',
            'Danger', 'Poisonous Rats', 'Venom', 'Posion', 'Sir Peters Left Hand', 'Sir Peters Right Hand', 'Sir Peters Left Foot',
            'Sir Peters Right Foot', 'Sir Peters Right Ear', 'Sir Peters Nose', 'Sir Peters Willy', 'Moistness']
        let name = firstNameArray[this.getRandomInt(firstNameArray.length)] + ' '
            + secondNameArray[this.getRandomInt(secondNameArray.length)] + ' Of '
            + thirdNameArray[this.getRandomInt(thirdNameArray.length)];
        return name;
    }

    damageGenerator() {
        let damage = Math.round(this.name.length / 3);
        return damage;
    }

}