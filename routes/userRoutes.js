const router = require('express').Router();
const userController = require('../controller/userController');


router.get('/', userController.getAllUsers);

router.use('*', (request, response, next) => {
    response.status(404).send("404 Page not found");
})


module.exports = router;