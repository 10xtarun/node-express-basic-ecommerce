
const mongodb = require("mongodb")
const { MONGO_URI } = require("./utils")

function connectDatabase() {
    console.log("MONGO URI: ", MONGO_URI)
    const mongoClient = new mongodb.MongoClient(MONGO_URI, {
        serverApi: {
            version: mongodb.ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    return mongoClient.connect()
        .then((connection) => {
            console.log("mongodb connection established")
            console.log("database name: ", connection.db("mCommerce").databaseName)

            return connection
        })
        // .catch(error => {
        //     console.log("database connection error: ", error)

        // })
}

module.exports = connectDatabase

