class foodClass {

    constructor() {
        this.name = "";
        this.food = this.foodGenerator()
    }

    foodGenerator() {
        let food;
        let number = this.getRandomInt(4);
        if (number == 3) {
            this.name = "Big Melon";
            food = 4;
        }
        else if (number >= 2) {
            this.name = "American Pie";
            food = 2;
        }
        else if (number >= 1) {
            this.name = "Dinged Up Apple";
            food = 1;
        }
        else {
            this.name = "Lousy Grape";
            food = 0;
        }
        return food
    }

    /*
    eatFood() {
        player.hp += 10;
    }
    */

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

