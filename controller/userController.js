const userList = require('../data/userData.json');
const crypto = require('crypto')


// get all user data from userlist

exports.getAllUsers = (request, response) => {
    return response.status(200).json(userList)
}

// get only one user in data

exports.getUserId = (request, response) => {
    const userId = userList.find((userId) => userId.id === request.params.id)
    if(!userId){
         response.status(400).send("Bad request");
    }
     response.status(200).json(userId)
}


exports.createUser = (request, response) => {

    const {name, email, userName} = request.body

    if(!name || !email || !userName){
      return  response.status(422).send(" Unprocessable Content")
    }

    const id = crypto.randomUUID();

    userList.push({
        id,
        name,
        email,
        userName
    })

    return response.status(201).send("Created product");
}
