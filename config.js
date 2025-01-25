
const mongoose = require("mongoose")
const { MONGO_URI } = require("./utils")

function connectDatabase() {
    console.log("MONGO URI: ", process.env.MONGO_URI)
    
    return mongoose
    .connect(process.env.MONGO_URI, {})
    .then((connection) => {
        console.log("mongodb connection established")
    })
    .catch(error => {
        console.log("mongodb connection failed: ", error)
    })
}

module.exports = connectDatabase

