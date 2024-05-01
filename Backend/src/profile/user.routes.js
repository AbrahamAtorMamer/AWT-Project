const userController = require("../profile/user.controller");
const express = require("express");
const router = express.Router();

// Route for creating a new user
router.post("/register", userController.create);
router.get("/register", userController.findAll);

// Route for user login
router.post("/login", userController.login);

module.exports = router;
