class roomClass {


    constructor() {
        this.nameGenerator = this.nameGenerator();
        this.enemies = this.enemies();

    }

    enemies() {
        let num = this.getRandomInt(3);
        if (num == 0)
            return new enemyClass();
        else if (num <= 2) {
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