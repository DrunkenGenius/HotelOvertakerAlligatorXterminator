class roomClass {


    constructor() {
        //this.name = this.nameGenerator();
        //this.weapons = this.weaponMaker();
        this.enemies = [new enemyMaker()];
    }

    /*weaponMaker() {
        let weapon = 'weapon'+'ID'+this.getRandomInt(99999);
        weapon = new weaponClass();
        return weapon
    }*/

   

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    nameGenerator() {

        let roomName = ['Hall', 'Diner', '']

        let name = roomName[this.getRandomInt(roomName.length)];
        return name;
    }

    damageGenerator() {
        let damage = Math.round(this.name.length / 3);
        return damage;
    }

}
let room = new roomClass();
console.log(room);