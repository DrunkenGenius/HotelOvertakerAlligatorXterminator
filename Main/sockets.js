//let  io = require('socket.io');
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const { emit } = require("nodemon");
const dbURI = 'mongodb://localhost/test';
const Schema = mongoose.Schema;

// Create the database connection 
mongoose.connect(dbURI, { useNewUrlParser: true });


exports.initialize = function (server) {

    // schema def
    const gameStateSchema = new Schema({
        users: [String],
        gameState: String
    });
    // model def
    const gameState = mongoose.model('gameState', gameStateSchema);

    //make document
    //const troelsGameState = new gameState({ users: ["Troels"], gameState: "room: nubs" });

    /*troelsGameState.save(function (err, troelsGameState) {
        if (err) return console.error(err);
        //console.log(troelsGameState)
    });*/

    //gameState.find(function (err, gameStates) {
    //    if (err) return console.error(err);
        /*console.log(gameStates);*/
    //})

    //gameState.find({ users: ["Troels"] }, function (err, gameStates) {
    //    if (err) return console.error(err);
        //console.log(gameStates);
    //})
    /*gameState.deleteMany({}, function (err, gameStates) {
        if (err) return console.error(err);
        console.log(gameStates);
    });*/



    //io = io.listen(server);
    const io = new Server(server);
    let users = [];
    io.on('connection', function (socket) {
        console.log('Client connected...');  
        let socketId = socket.id;

        socket.on('disconnect', function() {
            console.log("Disconnected", socket.id);
            let tempUsers = users.filter(user => user.id != socket.id);
            users = tempUsers;
            console.log(users);
        });

        socket.on('Login', function(username) {
            users.push({username: username, id: socketId})
            console.log("login as " + username);
            socket.emit("Login", users);
        });

        socket.on('ChooseRoom', function(clientData) {
            console.log("CosenRoom " + clientData.username);
            gameState.find({ users: [clientData.playerToJoin] }, function (err, dbData) {
                if (err) return console.error(err);


                if (dbData.length < 1) {
                    const newSave = new gameState({ users: [{username: clientData.username, player1 : clientData.world.world.player1}], gameState: JSON.stringify(clientData.world) });
                    newSave.save(function (err, newSave) {
                        if (err) return console.error(err);
                        console.log(newSave)
                    });
                    socket.emit("ChooseRoom", clientData);
                } else {
                    let gameState = {
                        username: dbData[0].users,
                        world: JSON.parse(dbData[0].gameState)
                    }
                    socket.emit("ChooseRoom", gameState);
                }

            });
            
        });

        
        socket.on('UpdateWorld', function (clientData) {
            socket.broadcast.emit('UpdateWorld', clientData);

            gameState.find({ users: [clientData.username] }, function (err, dbData) {
                if (err) return console.error(err);

                if (dbData.length < 1) {
                    const newSave = new gameState({ users: [clientData.username], gameState: JSON.stringify(clientData.world) });
                    newSave.save(function (err, newSave) {
                        if (err) return console.error(err);
                        console.log("updateworld" + newSave)
                    });
                } else {
                    var firstId = dbData[0]._id;
                    gameState.findById(firstId, function (err, object) {
                        if (err) return console.error(err);

                        object.set({ gameState: JSON.stringify(clientData.world) }); // UPDATE!
                        object.save(function () {
                        });
                        console.log(object + " Save updated")
                    });
                }

            });
        });
    });
    


    const findSavedGames = (username) => {
        gameState.find({ users: ["Troels"] }, function (err, gameStates) {
            if (err)
                return console.error(err);
            else {
                console.log(gameStates);
                return gameStates[1];
            }

        })
    }
}
