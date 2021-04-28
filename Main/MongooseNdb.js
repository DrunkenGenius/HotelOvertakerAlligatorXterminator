// from: https://mongoosejs.com/docs/index.html

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

  let roomSchema,Room;

  // NOTE: methods must be added to the schema before compiling it with mongoose.model()
  roomSchema = mongoose.Schema({
      name: String,
      world: String,
      player: Object
  });

  Room = mongoose.model('Room', roomSchema);

  let world2 = new Room( {userName:"gdsgds",world: "flemming", player: {name: "hans", item: "axe"}  });
  console.log(wowrld2);

   // save to the mongoDB -------------------
  world2.save(function (err, data) {
    if (err) return console.error(err);

      // then:
      // find all cats----      
      Room.find((err, Rooms)=>{
        if (err) return console.error(err);
        console.log(Rooms);
     
        // edit
        Rooms[0].name = 'princess';
        Rooms[0].save(function(err,data){
            if (err) return console.error(err);
            console.log('new data saved for first cat in the database: ',data );


            Room.find((err, Rooms)=>{
                    if (err) return console.error(err);
                    console.log('Finally:',Rooms);

                    // then:
                    db.close();
            });            
        });
        
      });
    });    
  });
