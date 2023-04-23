
// Import user model
const userModel = require("../models/userModel")

// Create a new user
exports.createUser = async(req, res ) => {
    try{
        // Create a new user using the user model and request body
        let user = await userModel.create(req.body)
        // Send a successful response with the created user and a status of 201
        return res.status(201).send({status: true, user})
    }
    catch(error){
        // Send an error response with the error message and a status of 500
        res.status(500).send({status:false, message: error.message})
    }
}

// Get all users
exports.getUser = async(req,res) =>{
    try {
        // Find all users using the user model
        let user = await userModel.find()
        // Send a successful response with the list of users and a status of 200
        return res.status(200).send(  user )
    } catch (error) {
        // Send an error response with the error message and a status of 500
        res.status(500).send({ status: false, message: error.message })
    }
}

// Get a single user by ID
exports.getOneUser = async(req, res)=>{
    try {
        // Get the ID from the request parameters
        const id= req.params.id
        // Find a user by ID using the user model
        let user = await userModel.findById({_id:id})
        // Send a successful response with the found user and a status of 200
        return res.status(200).send(  user )
    } catch (error) {
        // Send an error response with the error message and a status of 500
        res.status(500).send({ status: false, message: error.message })
    }
}

// Update a user by ID
exports.updateUser = async(req,res) =>{
    try {
        // Get the username, pincode, city, and state from the request body
        let {username, pincode,city,state} = req.body
        // Get the ID from the request parameters
        let id = req.params.id
        // Update the user by ID using the user model with the provided values and return the updated user
        let updateUser = await userModel.findByIdAndUpdate({_id:id},{username:username,pincode:pincode,city:city,state:state} ,{new:true})
        // Send a successful response with the updated user and a status of 200
        return res.status(200).send({status:true,updateUser, message: "User updated successfully"} )
    } catch (error) {
        // Send an error response with the error message and a status of 500
        res.status(500).send({ status: false, message: error.message })
    }
}

// Delete a user by ID
exports.deleteUser = async(req,res) =>{
    try {
        // Get the ID from the request parameters
        let id = req.params.id
        // Delete the user by ID using the user model
        let updateUser = await userModel.findByIdAndDelete({_id:id})
        // Send a successful response with a message and a status of 200
        return res.status(200).send({status:true, message: "User Deleted successfully"} )
    } catch (error) {
        // Send an error response with the error message and a status of 500
        res.status(500).send({ status: false, message: error.message })
    }
}
