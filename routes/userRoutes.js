const router = require('express').Router();
const userController = require('../controller/userController');


// get all users data
router.get('/', userController.getAllUsers);

// get pasific user with help of id
router.get('/:id', userController.getUserId);

// post create a user in user data
router.post('/', userController.createUser);

// put edit the user

router.put('/:id', userController.updateUser)

router.use('*', (request, response, next) => {
    response.status(404).send("404 Page not found");
})



module.exports = router;