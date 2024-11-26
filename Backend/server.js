const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/endpoints.js")
const userRoutes = require("./routes/UserRoutes")
const TestRoutes = require("./routes/TestRoutes")
const RequestRoutes = require("./routes/RequestRoutes")

const Test = require("./model/Test.js")

const app  = express()
app.use(express.json()) // this allows JSON parsing from requests
app.use(cors())


mongoose.connect(process.env.MONGODB_URL)
console.log("Connected")


app.use(userRoutes)
app.use(TestRoutes)
app.use(RequestRoutes)

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001")
})






