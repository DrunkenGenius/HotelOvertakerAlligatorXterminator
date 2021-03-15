class roomClass {


    constructor() {
        this.nameGenerator = this.nameGenerator();
        this.enemies = this.enemies();

    }

    enemies() {
        if (this.getRandomInt(3) == 0)
            return new enemyClass();
        else if (this.getRandomInt(3) < 2) {
            let twoEnemies = [new enemyClass(), new enemyClass()]
            return twoEnemies;
        }
    }


    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    nameGenerator() {

        let roomName = ['Hall', 'Diner', 'Livingroom', 'Kitchen', 'A Closet', ' Master Bedroom',
            'Under The Bed', 'Staffs Office', 'Sir Peters Room'
        ];

        let name = roomName[this.getRandomInt(roomName.length)];
        return name;
    }



}