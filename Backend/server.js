require("dotenv").config()
const express = require("express")
const app  = express()
const mongoose = require("mongoose")
const cors = require("cors")
const userRoutes = require("./routes/UserRoutes")
const TestRoutes = require("./routes/TestRoutes")
const RequestRoutes = require("./routes/RequestRoutes")



app.use(express.json()) // this allows JSON parsing from requests
app.use(cors())


mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("Connected"))


app.use(userRoutes)
app.use(TestRoutes)
app.use(RequestRoutes)

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001")
})


const Test = require("./model/Test"); // Replace with your model
const Request = require("./model/Request")

// Request.deleteMany({}).then((e)=> console.log(e))

// const test = Test.create({
//     testName: "NPK Kit",
//     unit : ["N","P","K"],
//     cost : 10
// })
// console.log(test)

//const request = Request.deleteMany({}).then((req) => console.log("Request Deleted!" , req)) 
//const tests = Test.find({}).select("testName").then((t) => console.log(t))

// //Dev function for accidentally making duplicates
// async function deleteDuplicates() {
//     try {
//         // Fetch all documents from the collection
//         const allTests = await Test.find();

//         // Create a map to track unique entries
//         const seen = new Map();

//         for (const test of allTests) {
//             const identifier = test.testName; // Replace with the field you want to check for duplicates
            
//             if (seen.has(identifier)) {
//                 // If this identifier is already seen, delete the duplicate
//                 await Test.findByIdAndDelete(test._id);
//             } else {
//                 // Mark this identifier as seen
//                 seen.set(identifier, true);
//             }
//         }

//         console.log("Duplicates removed successfully!");
//     } catch (error) {
//         console.error("Error removing duplicates:", error);
//     }
// }

// // Call the function
// deleteDuplicates();





