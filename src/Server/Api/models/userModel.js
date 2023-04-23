
// Import Mongoose library
const mongoose = require('mongoose')

// Create User schema with required fields
const userSchema = new mongoose.Schema({
    username: {
        type:String
    },
    pincode: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type:String
    }
})

// Export User model with User schema
module.exports = mongoose.model("User", userSchema)
