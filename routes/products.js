const express = require("express")
const utils = require("../utils")
const router = express.Router()
const mongodb = require("mongodb")
const { databaseClient } = require("../app")

router.get("/", (req, res) => {
    // throw Error("Random")

    return req.app.locals.database
        .db("mCommerce")
        .collection("products")
        .find()
        .toArray()
        .then((products) => {
            res.status(200)
            return res.json(
                utils.createResponseObject("products fetched successful", null, products)
            )
        })
})

router.post("/", (req, res) => {

    const productObj = req.body
    console.log("=== ", productObj)

    return req.app.locals.database
        .db("mCommerce")
        .collection("products")
        .insertOne({
            ...productObj
        })
        .then(insertedDoc => {
            res.status(201)
            return res.json(
                utils.createResponseObject("product created successful", null, insertedDoc)
            )
        })    
})

module.exports = router
