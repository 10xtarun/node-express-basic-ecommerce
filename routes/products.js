const express = require("express")
const utils = require("../utils")
const router = express.Router()
const mongoose = require("mongoose")
const Product = require("../models/products")

router.get("/", (req, res) => {
    // throw Error("Random")

    return Product
        .find()
        .then(products => {
            res.status(200)
            return res.json(
                utils.createResponseObject("products fetched successful", null, products)
            )
        })
})

router.post("/", (req, res, next) => {

    const productObj = req.body
    console.log("=== ", productObj)

    return Product.create(productObj)
        .then(insertedDoc => {
            res.status(201)
            return res.json(
                utils.createResponseObject("product created successful", null, insertedDoc)
            )
        })
        .catch(error => next(error))
})

router.put("/:product_id", (req, res, next) => {
    const productObj = req.body
    console.log("=== ", productObj)

    return Product
        .findByIdAndUpdate(req.params.product_id, productObj, { new: true })
        .then(updatedDoc => {
            return res.json(
                utils.createResponseObject("product updated successful", null, updatedDoc)
            )
        })
        .catch(error => next(error))

})

router.delete("/:product_id", (req, res, next) => {
    return Product.findByIdAndDelete(req.params.product_id)
    .then(deletedDoc => {
        return res.json(
            utils.createResponseObject("product deleted successful", null, deletedDoc)
        )
    })
    .catch(error => next(error))
})

module.exports = router
