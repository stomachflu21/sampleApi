var obj = {};
var contro_methods = require('../controller/cont.js')

obj = function (app, http) {
    // var msgs_methods = require('../controller/MessagesController.js');
    // var phone_methods = require('../controller/PhonesController.js');

    // app.route('/msgss/insrrt')
    //     .post(msgs_methods.Messages_Insert);

    // app.route('/msgs/list')
    //     .post(msgs_methods.Messages_List);

    // app.route('/phonesssss/list')
    //     .post(phone_methods.Phones_List);

    // app.route('/sample2')
    //     .post(sample_methods.SampleMidware,sample_methods.samplennaman)

    // app.route('/tryMuna')
    //     .post(contro_methods.GetAccessCodes)

    // app.route('/getReadyList')
    //     .post(contro_methods.GetReadyList)

    // app.route('/groups/EnterUsingAccessCode')
    //     .post(contro_methods.CreateNewGroup_C)

    // app.route('/groups/GetRooms')
    //     .post(contro_methods.GetRooms)

    app.route('/users/List')
        .post(contro_methods.GetUserList)

    app.route('/users/add')
        .post(contro_methods.InsertUser)

    app.route('/users/update')
        .post(contro_methods.UpdateUser)

    app.route('/users/view')
        .post(contro_methods.ViewUserDetails)

    app.route('/users/delete')
        .post(contro_methods.DeleteUser)
    app.route('/auth')
        .post(contro_methods.login)
}

module.exports = obj;