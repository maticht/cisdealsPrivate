const express = require('express');
const router = express.Router();
// const jwt = require("express-jwt");
// const checkJwt = jwt({secret: 'key', algorithms:['HS256']});
const {postDelete, create, view, like, unlike, viewbyid, servProfile, updateServ} = require("./postsController");

router.post('/create', create)
    .get('/', view)
    .get('/viewbyid', viewbyid)
    .get('/servProfile/:ServId', servProfile)
    .put('/like', like)
    .put('/unlike', unlike)
    .put('/updateServ/:ServId', updateServ)
    .delete('/post-delete/:ServId', postDelete)

module.exports = router;
