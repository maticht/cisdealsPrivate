const express = require('express');
const rout = require('./router');
const routPosts = require('./postsRouter');
require("dotenv").config();
const cors = require("cors");
const app = express();
const userRoutes = require("./models/users");
const userAuth = require("./models/auth");
const userUpdate = require("./models/update");
const userUpdatePhoto = require("./models/uploadPhoto");
const saveUser = require("./models/savedUsers")
const unSaveUser = require("./models/unSaveUser")
const getFavoritesUsers = require("./models/getFavoriteUsers")
const moveToFront = require("./models/moveToFront")
const removeImage = require("./models/removeImage")
const verifyToken = require("./models/verifyToken")
const addingRating = require("./models/addingRating")
const connection = require("./db");

connection();

app.use(cors());
app.use(express.json());
app.use(rout);
app.use(routPosts);
app.use("/users", userRoutes);
app.use("/verifyToken", verifyToken);
app.use("/auth", userAuth);
app.use("/update", userUpdate);
app.use("/update", userUpdate);
app.use("/uploadPhoto", userUpdatePhoto);
app.use("/saveUser", saveUser);
app.use("/unSaveUser", unSaveUser);
app.use("/getFavoritesUsers", getFavoritesUsers);
app.use("/moveToFront", moveToFront);
app.use("/removeImage", removeImage);
app.use("/addingRating", addingRating);



const PORT = process.env.PORT || 80;
const serverAddress = "http://backend.delkind.pl";

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
    console.log(`Server address: ${serverAddress}`);
});
