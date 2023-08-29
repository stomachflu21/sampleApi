var obj = {};
const { v4: uuidv4 } = require('uuid');
var userList = [
    {
        id: '1',
        fullName: 'Paterno, Jayson P.',
        userName: 'JPPATERNO',
        contactNo: '09298231350',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQYgtNIF0gjeiVs-MH9gn0EwX_Vm3coOY6A&usqp=CAU',
        createdBy: '',
        dateCreated: "",
        email: "jay.paterno@gmail.com",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu suscipit metus. Suspendisse congue augue nec libero volutpat, vitae ornare tellus ultrices. Nunc lacinia, odio eu volutpat laoreet, neque nisi facilisis sapien, eget lacinia lacus velit ornare orci. Quisque.'
    }
];

var tokens = [

]

const rand = () => {
    return Math.random().toString(36).substr(2);
};

const token = () => {
    return rand() + rand();
};

obj.login = async function (userName) {
    try {
        var e = userList.filter((p) => {
            return p.userName.toLowerCase() == userName.toLowerCase()
        });
        console.log(userList)
        console.log(e + 'ereee')
        if (e.length > 0) {
            var token2 = token();
            tokens.push(token2)
            console.log(tokens)
            return {
                token: token2
            };
        }
        else {

            return false;
        }
    }
    catch (e) {
        console.log(e)
        return 'BAD';
    }
}

obj.doesTokenExist = async function (token) {
    if (token !== undefined) {
        var e = tokens.filter((p) => {
            return p == token;
        });
        return (e.length > 0) ? true : false;
    }
    else {
        return false;
    }

}

obj.getUsers = async function (searchString) {
    try {
        return userList.filter((p) => {
            return p.fullName.toLowerCase().includes(searchString.toLowerCase())
        }).slice();
    }
    catch (e) {
        console.log(e)
        return false;
    }
}



obj.insertUser = async function (user) {
    try {
        var newList = JSON.parse(JSON.stringify(userList));
        var ifExists = newList.filter((p) => { return p.userName == user.userName });
        if (ifExists.length == 0) {
            user.id = uuidv4();
            userList.push(user);
            // console.log(userList)
            return true;
        }
        return false;
    }
    catch (e) {
        console.log(e)
        return 'BAD';
    }
}

obj.updateUser = async function (user) {
    try {

        const index = userList.findIndex(object => {
            return object.id === user.id;
        });
        userList[index].fullName = user.fullName;
        userList[index].photo = user.photo;
        userList[index].contactNo = user.contactNo;
        userList[index].description = user.description;
        userList[index].email = user.email;
    }
    catch (e) {
        console.log(e)
        return 'BAD';
    }
}

obj.getDetails = async function (id) {
    try {
        const index = userList.findIndex(object => {
            return object.id === id;
        });
        // console.log(userList)
        // console.log(JSON.parse(JSON.stringify(userList)))
        return userList.slice()[index];
    }
    catch (e) {
        return 'BAD';
    }
}

obj.deleteUser = async function (id) {
    try {
        if (id != '1') {
            const index = userList.findIndex(object => {
                return object.id === id;
            });
            userList.splice(index, 1);
        }

    }
    catch (e) {
        return 'BAD';
    }
}

module.exports = obj;