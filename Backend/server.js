const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");




const webApp  = express()
webApp.use(express.json()) // this allows JSON parsing from requests

// // Conecting to the MonogDB database
mongoose.connect(
"mongodb+srv://"+process.env.MONGODB_USERNAME+
":"+process.env.MONGODB_PASSWORD+"@"+
process.env.MONGODB_CLUSTER+"/?retryWrites=true&w=majority&appName=SoilCluster")
.then(() => console.log("Connected"))
.catch(err => console.error("Error connecting to Database"));



// //Creating the server
// const Port = process.env.PORT;
// webApp.listen(Port, () => {
//     console.log("Server is running!")
// })