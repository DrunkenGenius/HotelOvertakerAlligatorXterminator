class roomClass {


    constructor() {
        this.name = this.nameGenerator();
        this.enemies = this.enemies();
        this.loot = [];
    }

    enemies() {
        let num = this.getRandomInt(3);
        if (num == 0)
            return [new enemyClass()];
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

    addLoot(item) {
        this.loot.push(item);
    }
}