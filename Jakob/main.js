
    let world = [new worldCreatorClass()];
    let items = [];
    
    function inventory(){
        return items;
    }

    function addItem(theItem){
        items.push(theItem);
    }

    function removeItem(theItem){
        items.splice(theItem);
    }
   
 
let wep1 = new weaponClass;
console.log(wep1);
addItem(wep1);
let food1 = new foodClass;
addItem(food1);
console.log(items);
removeItem(0,0);
console.log(items);

