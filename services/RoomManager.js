
//require('linqjs');
var obj = {};
// var Home = {
//     AccessCode: "",
//     Rooms: [
//         {
//             ID: "",
//             RoomName: "",
//             HostID: "",
//             AccessCode: "",
//             Viewers: [
//                 {
//                      ID: ""
//                     ViewerName: "",
//                 }
//             ]
//         }
//     ]
// }
//global.Homes = "tangek"; 
//global.Groups
//global.Rooms
//global.Viewers

obj.CreateNewGroup = function(accessCode){
    //global.Groups = [];
    //console.log(global.Groups)
    global.Groups.push({
        AccessCode: accessCode,
        Rooms: []
    });
}

obj.RemoveGroup = function(accessCode){
    var accessCodeIndex = global.Groups.findIndex(group => group.AccessCode == accessCode);
    global.Groups.splice(accessCodeIndex, 1);
}

obj.CreateNewRoom = function(accessCode, roomName, socketID, peerID){
    var accessCodeIndex = global.Groups.findIndex(group => group.AccessCode == accessCode);
    //console.log(global.Groups[accessCodeIndex])
    global.Rooms.push({
        AccessCode: accessCode,
        ID: socketID,
        RoomName: 'room-'+ roomName,
        HostID: socketID,
        HostPeerID: peerID
    })
}


obj.RemoveRoom = function(socketID){
    var roomIndex = global.Rooms.findIndex(room => room.HostID == socketID);
    if(roomIndex > 0){
        global.Rooms.splice(roomIndex, 1);
        console.log("room in global deleted")
    }
}

obj.RemoveRoomByName = function(roomName){
    var roomIndex = global.Rooms.findIndex(room => room.RoomName == roomName);
    if(roomIndex > 0){
        global.Rooms.splice(roomIndex, 1);
        console.log("room in global deleted")
    }
}

obj.AddViewer = function(accessCode, roomID, socketID){
    var accessCodeIndex = global.Groups.findIndex(group => group.AccessCode == accessCode);
    var roomIndex = global.Groups[accessCodeIndex].Rooms.findIndex(room => room.ID == roomID);
    global.Groups[accessCodeIndex].Rooms[roomIndex].Viewers.push({
        ID: socketID,
        ViewerName: ""
    })
}

obj.RemoveViewer = function(accessCode, roomID, socketID){
    var accessCodeIndex = global.Groups.findIndex(group => group.AccessCode == accessCode);
    var roomIndex = global.Groups[accessCodeIndex].Rooms.findIndex(room => room.ID == roomID);
    var viewerIndex = global.Groups[accessCodeIndex].Rooms[roomIndex].Viewers.findIndex(viewer => viewer.ID == socketID);

    global.Groups[accessCodeIndex].Rooms[roomIndex].Viewers.splice(viewerIndex,1);
}

module.exports = obj;