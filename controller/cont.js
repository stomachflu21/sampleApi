//require('linqjs');
//var dbServices = require('../services/dbServices.js')
var userServices = require('../services/UserServices.js')
var obj = {};

var list = [];

obj.GetAccessCodes = async function (req, res) {
    var a = await dbServices.Query_GetListOfAccessCode();
    list = [];
    list = JSON.parse(JSON.stringify(a));

    res.status(200).json("OK")
}

obj.login = async function (req, res) {
    var result = await userServices.login(req.body.userName);
    if (result == 'BAD') {
        res.status(400).json('BAD REQUEST BEYBE')
    }
    else {
        res.status(200).json(result)
    }
}

obj.GetUserList = async function (req, res) {
    var tokenCheck = await userServices.doesTokenExist(req.headers['token']);
    console.log(tokenCheck)
    if (!tokenCheck) {
        res.status(400).json('BAD REQUEST BEYBE');
        return;
    }

    var list = await userServices.getUsers(req.body.searchString);
    if (!list) {
        res.status(400).json('BAD REQUEST BEYBE')
    }
    else {
        res.status(200).json(list);
    }
}

obj.InsertUser = async function (req, res) {
    var tokenCheck = await userServices.doesTokenExist(req.headers['token']);
    console.log(tokenCheck)
    if (!tokenCheck) {
        res.status(400).json('BAD REQUEST');
        return;
    }

    var result = await userServices.insertUser(req.body.user);
    if (result == 'BAD') {
        res.status(400).json('BAD REQUEST')
    }
    else {
        res.status(200).json(result)
    }
}

obj.ViewUserDetails = async function (req, res) {
    var tokenCheck = await userServices.doesTokenExist(req.headers['token']);
    console.log(tokenCheck)
    if (!tokenCheck) {
        res.status(400).json('BAD REQUEST');
        return;
    }

    var result = await userServices.getDetails(req.body.id);
    console.log(result);
    if (result == 'BAD') {
        res.status(400).json('BAD REQUEST')
    }
    else {
        res.status(200).json(result)
    }

}

obj.UpdateUser = async function (req, res) {
    var tokenCheck = await userServices.doesTokenExist(req.headers['token']);
    console.log(tokenCheck)
    if (!tokenCheck) {
        res.status(400).json('BAD REQUEST');
        return;
    }
    console.log(req.body.user)
    var result = await userServices.updateUser(req.body.user);
    
    if (result == 'BAD') {
        res.status(400).json('BAD REQUEST')
    }
    else {
        res.status(200).json(true)
    }
}

obj.DeleteUser = async function (req, res) {
    var tokenCheck = await userServices.doesTokenExist(req.headers['token']);
    console.log(tokenCheck)
    if (!tokenCheck) {
        res.status(400).json('BAD REQUEST');
        return;
    }

    var result = await userServices.deleteUser(req.body.id);
    if (result == 'BAD') {
        res.status(400).json('BAD REQUEST')
    }
    else {
        res.status(200).json(true)
    }
}


// obj.GetReadyList = function(req, res){
//     const a1 =Date.now();
//     console.log(list)
//     var js = JSON.parse(JSON.stringify(list));
//     const a2 = Date.now();
//     console.log(`Time Taken to execute = ${(a2 - a1)/1000} seconds`);
//     res.status(200).json("ok")
// }
// obj.CreateNewGroup_C = async function(req, res){
//     var ifExists = await dbServices.Query_CheckIfAccessCodeExist(req.body.accessCode);
//     console.log(ifExists)
//     if(ifExists < 1){
//         await dbServices.Insert_AccessCode(req.body.accessCode, "", 0)
//         RoomManager.CreateNewGroup(req.body.accessCode);
//     }

//     res.status(200).json("OK");
// }
// obj.GetRooms = async function(req,res){
//     console.log('get rooms')
//     var list2 = global.Rooms.filter((x) => x.AccessCode == req.body.accessCode);
//     console.log(list2)
//         // .where((groups) => groups.AccessCode == req.body.accessCode)
//         // .select(x => x.Rooms)
//     //console.log(list)
//     console.log(list2)
//     res.status(200).json(list2)
// }

module.exports = obj;
