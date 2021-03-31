class foodClass {

    constructor() {
        this.name = "Food";
        this.food = this.foodGenerator()
    }

    foodGenerator() {
        let food;
        let number = this.getRandomInt(4);
        if (number == 3) {
            food = 4;
        }
        else if (number >= 2) {
            food = 2;
        }
        else if (number >= 1) {
            food = 1;
        }
        else {
            food = 0;
        }
        return food
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

