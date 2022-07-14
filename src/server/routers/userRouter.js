require("dotenv").config();

const express = require("express");
const registerUser = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login");
module.exports = userRouter;
