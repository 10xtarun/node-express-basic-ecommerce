const express = require("express")

const productRouter = require("./routes/products")
const connectDatabase = require("./config")

const PORT = 8000
let databaseClient = connectDatabase()

function createApp() {
    const app = express()

    return Promise.resolve()
    .then(() => {
        // default middlewares
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        // custom middlewares
    })
    .then(() => {
        // connect to database
        return  connectDatabase()
    })
    .then((connection) => {
        app.locals.database = connection
    
        // routers
        app.get("/greetings", (req, res) => {
            return res.send("Greetings! server is running.")
        })

        // add other routers
        app.use("/products", productRouter)
    })
    .then(() => {
        // default error handler middleware
        app.use((error, req, res, next) => {
            console.log("error: ", error)
            if (res.headersSent) {
              return next(error)
            }
            res.status(500)
            res.send(error)
          })
    })

    .then(() => {
        console.log("app created")
        
        app.listen(PORT, () => {
            console.log("server is listening on port number: ", PORT)
        })
    })
    .catch(error => {
        console.log(error.msg)
        console.log("error occured: ", error)
    })
}

module.exports = {
    createApp,
    databaseClient
} 