var obj = {};
var client = require('../base/cqlDBServices.js').client;


obj.Query_GetListOfAccessCode = async function(){
    var query = "select * from GetListOfAccessCodes";
    var params = [];
    var result = await client.execute(query)
   
    var retList = [];
    for(var i = 0; i < result.rows.length;i++){
        var ent = {
            accesscode: result.rows[i].accesscode,
            createdby: result.rows[i].createdby,
            datecreated: result.rows[i].datecreated,
            isunli: result.rows[i].isunli
        }
        retList.push(ent);
    }
    return retList;
}

obj.Query_CheckIfAccessCodeExist = async function(accessCode){
    try{
        var query = "select * from getlistofaccesscodes where accesscode = ?";
        var params = [accessCode];
        var result = await client.execute(query, params, {prepare: true});
        console.log(result)
        if(result.rows.length > 0){
            return (result.rows[0].isunli == 1) ? 2:1;
        }
        else{
            return 0;
        }
    }
    catch(e){
        console.log(e.message)
        return 'error';
    }
}


obj.Insert_AccessCode = async function(accessCode, createdBy, isUnli){
    console.log("umabot")
    var query = "insert into getlistofaccesscodes (accesscode, createdby, isunli, datecreated)  Values (?,?,?,?)";
    var params = [accessCode, "", isUnli, new Date()];
    var dd = await client.batch([{query: query, params: params}], {prepare: true});
    return 1;
}

module.exports = obj;