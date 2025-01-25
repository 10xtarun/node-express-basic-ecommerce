const express = require("express")
const { validationResult, checkSchema } = require("express-validator")
const utils = require("../utils")
const User = require("../models/user")
const Orders = require("../models/order")
const router = express.Router()

router.post(
    "/",
    checkSchema({
        quantity: {
            isNumeric: {
                errorMessage: "quantity should be a number"
            },
            custom: {
                options: (value) => {
                    if (value > 0) return true
                    else return false
                },
                errorMessage: "quantity should be more than zero"
            }
        }
    }),
    (req, res, next) => {

        console.log("===req.user ", req.userEmail)

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.json(
                utils.createResponseObject("product create fail", result.array(), {})
            )
        }

        const orderObj = req.body

        return User.findOne({ email: req.userEmail })
            .then((userDoc) => {
                console.log("==userDoc ", userDoc)
                orderObj.userId = userDoc.id
                return Orders.create(orderObj)
            })
            .then(insertedDoc => {
                res.status(201)
                return res.json(
                    utils.createResponseObject("order created successfully", null, insertedDoc)
                )
            })
            .catch(error => next(error))
    }
)

router.get(
    "/",
    (req, res, next) => {
        return Orders.find()
        .populate({ 
            path: 'productId', 
            // populate: [{ path: 'user' }] 
          })
        .then(orders => {
            res.status(200)
                return res.json(
                    utils.createResponseObject("order fetched successfully", null, orders)
                )
        })
        .catch(error => next(error))
    }
)


module.exports = router