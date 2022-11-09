const express = require("express");
const { Signup, Login } = require("../controllers/auth");
const AuthRoute = express.Router();

// signup route
AuthRoute.post("/signup", Signup);
AuthRoute.post("/login", Login);

module.exports = AuthRoute;
