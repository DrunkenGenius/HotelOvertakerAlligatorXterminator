class main {

    constructor() {
        this.world = [new worldCreatorClass()];
        this.game = this.game();
    }
    
    world(){
        let room =  new roomClass();
        console.log(room);
        return room ;
        
    }

    game(){
        let game
        return game;

    }
   
} 
