const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/endpoints.js")
const Request = require("./model/Request.js")
const User = require("./model/User.js")


const app  = express()
app.use(express.json()) // this allows JSON parsing from requests
app.use(cors())
// // // Conecting to the MonogDB database
// mongoose.connect((process.env.MONGODB_URL)
// .then(() => {
// console.log("Connected")

// app.use(routes)

// })
// .catch(err => console.error("Error connecting to Database")));

// const request = new Request({
//     tests: [
//     {
//         quantity:1,
//         price:10
//     }]
// })
// request.save()

mongoose.connect(process.env.MONGODB_URL);
console.log("Connected");


// const myUser = new User({
//     name: "Donavin", 
//     email:"myDonavinemail@gmail.com",
//     password:"password123",
//     homeAddress:"123 main street",
// })
// myUser.save()
app.use(routes);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})

// //Creating the server
