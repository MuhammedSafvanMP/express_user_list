const userList = require('../data/userData.json');


exports.getAllUsers = (request, response) => {
    return response.status(200).json(userList)
}