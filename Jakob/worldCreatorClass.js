class worldCreatorClass {


    constructor() {
        this.world = this.world();
        
    }

    world(){
        let rooms = [new roomClass, new roomClass, new roomClass];
        return  rooms;

    }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }



}
let thidsas = new worldCreatorClass;
console.log(thidsas);
