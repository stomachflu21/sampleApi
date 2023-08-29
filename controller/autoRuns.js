var obj = {}
var dbServices = require('../services/dbServices.js')
var RoomManager = require('../services/RoomManager.js')


obj = function(){
    setImmediate( async () =>{
        //getAllAccessCodes
        var list = await dbServices.Query_GetListOfAccessCode();
        for(var i = 0; i < list.length;i++){
            global.Groups.push({
                AccessCode: list[i].accesscode,
                Rooms: []
            })
        }
    });
}

module.exports = obj;