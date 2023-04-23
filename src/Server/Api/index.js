
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/route')
const cors = require('cors')
const app = express()

// Enable CORS middleware
app.use(cors())

// Enable parsing of JSON data in requests
app.use(express.json())

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/Profiles_Form")
.then( ()=> console.log("DB is connected"))
.catch((err)=>console.log(err))

// Use the router for handling API endpoints
app.use('/', router);

// Start the server and listen for incoming requests
app.listen(process.env.port || 5000, ()=> {
    console.log('Running at Port 5000')
})

