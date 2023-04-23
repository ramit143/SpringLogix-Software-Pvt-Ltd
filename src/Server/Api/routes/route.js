
const express = require('express')
const router = express.Router()

// Importing controller functions for user-related functionalities
const {createUser, getUser, getOneUser, deleteUser, updateUser} = require("../controllers/userController")

// Route for creating a user
router.post("/users", createUser)

// Route for getting all users
router.get("/users", getUser)

// Route for getting a specific user by ID
router.get("/users/:id", getOneUser)

// Route for deleting a specific user by ID
router.delete("/users/:id", deleteUser)

// Route for updating a specific user by ID
router.put("/users/:id", updateUser)

// Exporting the router object
module.exports = router
