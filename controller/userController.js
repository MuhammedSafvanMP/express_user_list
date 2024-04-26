const userList = require('../data/userData.json');
const crypto = require('crypto');
const { use } = require('../routes/userRoutes');
const fs = require("fs");


// get all user data from userlist

exports.getAllUsers = (request, response) => {
    return response.status(200).json(userList)
}

// get only one user in data

exports.getUserId = (request, response) => {
    const userId = userList.find((userId) => userId.id === request.params.id)
    if(!userId){
         response.status(204).json({message: " No Content"});
    }
     response.status(302).json(userId)
}

// post creating new user in data

exports.createUser = (request, response) => {

    const {name, email, userName} = request.body

    if(!name || !email || !userName){
      return  response.status(422).json({ message : " Unprocessable Content"})
    }

    const id = crypto.randomUUID();

    userList.push({
        id,
        name,
        email,
        userName
    })

    fs.writeFile("./data/userData.json", JSON.stringify(userList), (writeErr) => {
        if (writeErr) { 
            return response.status(500).json({message: "Internal Server Error: Failed to create user."});
        }
    });


    return response.status(201).json({message: "Created new user"});
}

// updating user put

exports.updateUser = (request, response) => {
    const updateUserIndex = userList.findIndex((user) => user.id === request.params.id);

    if (updateUserIndex === -1) {
        return response.status(400).json({ message: "Bad Request: User not found" });
    }

    const updateUser = userList[updateUserIndex];

    const { name, email, userName } = request.body;

    // Update user data if new data is provided
    if (name) updateUser.name = name;
    if (email) updateUser.email = email;
    if (userName) updateUser.userName = userName;

    // Write updated userList to the file
    fs.writeFile("./data/userData.json", JSON.stringify(userList), (writeErr) => {
        if (writeErr) {
            return response.status(500).json({ message: "Internal Server Error: Failed to update user" });
        }
        return response.status(200).json({ message: "User modified successfully" });
    });
};

// delete user

exports.deleteUser = (request, response) => {
    const deleteUserIndex = userList.findIndex((user) => user.id === request.params.id);

    if (deleteUserIndex === -1) {
        return response.status(404).json({ message: "User not found" });
    }

    userList.splice(deleteUserIndex, 1);

    fs.writeFile("./data/userData.json", JSON.stringify(userList), (writeErr) => {
        if (writeErr) {
            return response.status(500).json({ message: "Internal Server Error: Failed to delete user." });
        }

        return response.status(200).json({ message: "User deleted successfully" });
    });
};
