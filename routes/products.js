const express = require("express")
const { body, validationResult, checkSchema } = require("express-validator")
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

router.post(
    "/",
    // body("title").notEmpty(),
    // body("rating").isNumeric().custom(value => {
    //     if (value > 5) { throw Error("value greater than 5 is not allowed") }
    // }),
    checkSchema({
        title: {
            notEmpty: true,
            errorMessage: "title should not be empty"
        },
        rating: {
            isNumeric: {
                errorMessage: "rating should be a number"
            },
            custom: {
                options: (value) => {
                    if (value > 0 && value < 5) { return true }
                    else { return false }
                },
                errorMessage: "rating should be in the range of 0 to 5"
            }
        },
        discount: {
            isNumeric: {
                errorMessage: "discount should be a number"
            }
        },
        description: {
            notEmpty: true,
            errorMessage: "description should not be empty"
        },
        price: {
            notEmpty: {
                errorMessage: "price should not be empty"
            },
            isNumeric: {
                errorMessage: "price should be a number"
            },
            custom: {
                options: (value) => {
                    if (value >= 0) { return true }
                    else { return false }
                },
                errorMessage: "price should be greater or equal to zero"
            }
        },
        image: {
            notEmpty: {
                errorMessage: "image should not be empty"
            },
            isString: {
                errorMessage: "image should be a valid string"
            }
        }
    }),
    (req, res, next) => {
        const result = validationResult(req);
        console.log("===result ", result)
        if (!result.isEmpty()) {
            return res.json(
                utils.createResponseObject("product create fail", result.array(), {})
            )
        }

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
