const Router = require('express');
const router = new Router();
const jwt = require("express-jwt");
const {getAllUsers, userProfile} = require('./controller');

router
    .get('/getAllUsers',getAllUsers)
    .get('/user-profile/:userId/', userProfile)

module.exports = router
