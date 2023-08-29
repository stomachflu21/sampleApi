var obj = {};
var RoomManager = require('../services/RoomManager.js')

obj = function(io){
    //console.log(io)
    console.log('nag ok!')
    io.on('connection', socket => {

        console.log("connected si socket:: " + socket.id)
        // When someone attempts to join the room
        socket.on('join-room', (roomId, peerID) => {
            console.log(roomId)
            socket.join(roomId)  // Join the room
            //socket.broadcast.emit('user-connected', socket.id) // Tell everyone else in the room that we joined
            io.to(roomId).emit('userConnected', peerID) // Tell everyone else in the room that we joined\
            io.to(roomId).emit('tignan', 'OO TIGNAN MO');
            //socket.to('room-' + roomId).emit('userConnected', peerID)
            console.log('nag join si ' + peerID + " sa " + roomId)
            // Communicate the disconnection
            socket.on('disconnect', () => {
                socket.broadcast.emit('user-disconnected', socket.id)
            })
        })

        socket.on('host-room', (accessCode, roomName, peerID) =>{
            RoomManager.CreateNewRoom(accessCode, roomName, socket.id, peerID)
            socket.join('room-'+ roomName)

            io.to('room-'+ roomName).emit("receiveRoomID", 'room-'+roomName);
            console.log('host0room ' + peerID)
        })


        socket.on('HostRejoin', (roomId)=>{
            socket.join(roomId);
            console.log('host has rejoined')
        });

        socket.on('requestViewersToReconnect', (roomName) =>{
            console.log('requestViewersToReconnect ' +roomName)
            io.to(roomName).emit('ViewerReconnect');
        })

        socket.on("GoViewerReconnect", (roomId, peerID)=>{
            console.log('napunta na dito s GoViewerReconnect ' + roomId + ' ' + peerID)
            socket.leave(roomId);
            console.log('tapos na mag leave')
            socket.join(roomId)  // Join the room
            //socket.broadcast.emit('user-connected', socket.id) // Tell everyone else in the room that we joined
            io.to(roomId).emit('userConnected', peerID) // Tell everyone else in the room that we joined\
            io.to(roomId).emit('tignan', 'Reconnected si viewer');
            //socket.to('room-' + roomId).emit('userConnected', peerID)
            console.log('nag reconnect si ' + peerID + " sa " + roomId)
            // Communicate the disconnection
            socket.on('disconnect', () => {
                socket.broadcast.emit('user-disconnected', socket.id)
            })
        })

        socket.on("DeleteRoom",async (roomName) =>{
            RoomManager.RemoveRoomByName(roomName);
            io.to(roomName).emit('leaveRoomForce');

        //     var clients = io.sockets.adapter.rooms.get(roomName);

        //     for (var clientId of clients) {
        //         //this is the socket of each client in the room.
        //         const clientSocket = io.sockets.sockets.get(clientId);
        //         //you can do whatever you need with this
        //         clientSocket.leave(roomName)
           
        //    }
            // io.sockets.clients(roomName).forEach(function(s){
            //     s.leave(roomName);
            // });

            
            // var room = io.sockets.adapter.rooms['roomName']
            // console.log(room)
            // var socketss = Object.keys(room.sockets)
            // socketss.forEach(function(socketID){
            //     socketID.leave(roomName)
            // })

            var socketss = await io.in(roomName).fetchSockets();
            console.log(socketss)
            for(var i = 0; i< socketss.length;i++){
                socketss[i].leave(roomName)
            }
           
        })

    })


}

module.exports = obj;