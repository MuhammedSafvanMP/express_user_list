const userList = require('../data/userData.json');
const crypto = require('crypto');
const { use } = require('../routes/userRoutes');


// get all user data from userlist

exports.getAllUsers = (request, response) => {
    return response.status(200).json(userList)
}

// get only one user in data

exports.getUserId = (request, response) => {
    const userId = userList.find((userId) => userId.id === request.params.id)
    if(!userId){
         response.status(204).send(" No Content");
    }
     response.status(302).json(userId)
}

// post creating new user in data

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

// updating user put

exports.updateUser = (request, response) => {
    const updateUser = userList.find((user) => user.id === request.params.id);

    if(!updateUser){
       return response.status(400).send(" Bad Request");   
    }

    const {name, email, userName} = request.body
  
    // assign new datas
    
    if(name)
        updateUser.name = name;
    if(email)
        updateUser.email = email;
    if(userName)
        updateUser.userName = userName;
    


    return response.status(201).send("Modified user")
}

// delete user

exports.deleteUser = (request, response) => {
    const deleteUser = userList.findIndex((index) => index.id === request.params.id)

    if(deleteUser == -1){
        return response.status(404).send("Page not found")
    }

    userList.splice(deleteUser, 1);

    return response.status(200).send("Delete successfuly")
}
