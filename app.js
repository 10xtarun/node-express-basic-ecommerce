const express = require("express")
require('dotenv').config()

const productRouter = require("./routes/products")
const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const connectDatabase = require("./config")
const { createResponseObject } = require("./utils")
const ordersRouter = require("./routes/order")
const User = require("./models/user")

function createApp() {
    const app = express()

    return Promise.resolve()
        .then(() => {
            // default middlewares
            app.use(express.json())
            app.use(express.urlencoded({ extended: true }))

            // custom middlewares
            app.use((req, res, next) => {
                try {
                    console.log("==req.headers ", req.headers)
                    if (req.headers.authorization) {
                        if (req.headers.authorization == "Bearer abcd1234") { 
                            req.user = { email : "10xtarun@gmail.com" }
                            next() 
                        } 
                        else { throw Error("invalid auth token")}
                    } else {
                        throw Error("invalid user login")
                    }
                } catch (error) {
                    next(error)
                }
            })
        })
        .then(() => connectDatabase())
        .then(() => {
            // routers
            app.get("/greetings", (req, res) => {
                return res.send("Greetings! server is running.")
            })



            // add other routers
            app.use("/products", productRouter)
            app.use("/users", userRouter)
            app.use("/auth", authRouter)
            app.use("/orders", ordersRouter)
        })
        .then(() => {
            // default error handler middleware
            app.use((error, req, res, next) => {
                console.log("error: ", error)
                if (res.headersSent) {
                    return next(error)
                }
                res.status(422)
                res.json(
                    createResponseObject("request failed", error, [])
                )
            })
        })

        .then(() => {
            console.log("app created")

            app.listen(process.env.PORT, () => {
                console.log("server is listening on port number: ", process.env.PORT)
            })
        })
        .catch(error => {
            console.log(error.msg)
            console.log("error occured: ", error)
        })
}

module.exports = createApp 