class roomClass {


    constructor() {
        this.nameGenerator = this.nameGenerator();
        this.enemies = [new enemyClass()];
        
    }

 
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    nameGenerator() {

        let roomName = ['Hall', 'Diner', 'Livingroom', 'Kitchen','Closet',' Master Bedroom',
        'Under The Bed','Staffs Office','Sir Peters Room'];

        let name = roomName[this.getRandomInt(roomName.length)];
        return name;
    }



}
