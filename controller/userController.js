const userList = require('../data/userData.json');


// get all user data from userlist

exports.getAllUsers = (request, response) => {
    return response.status(200).json(userList)
}

exports.getUserId = (request, response) => {
    const userId = userList.find((userId) => userId.id === request.params.id)
    if(!userId){
         response.status(400).send("Bad request");
    }
     response.status(200).json(userId)
}

