const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/endpoints.js")
const Request = require("./model/Request.js")



const app  = express()
app.use(express.json()) // this allows JSON parsing from requests

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


app.use(routes);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})

// //Creating the server
