
    let world = [new worldCreatorClass()];
    let items = [];
    
    function inventory(){
        return items;
    }

    function addItem(theItem){
        items.push(theItem);
    }

    function removeItem(){

    }
   
 
let wep1 = new weaponClass;
console.log(wep1);
addItem(wep1);
addItem(new foodClass);
console.log(inventory());
