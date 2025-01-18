const express = require("express")
const { validationResult, checkSchema } = require("express-validator")
const utils = require("../utils")
const User = require("../models/user")
const router = express.Router()

router.post(
    "/",
    checkSchema({
        "*": {
            isString: {
                errorMessage: "field should be a string"
            }
        },
        firstName: {},
        lastName: {},
        email: {
            notEmpty: {
                errorMessage: "email should not be empty"
            },
            isEmail: {
                errorMessage: "email should be proper or valid value"
            }
        }
    }),
    (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.json(
                utils.createResponseObject("product create fail", result.array(), {})
            )
        }

        return User.create(req.body)
            .then(insertedDoc => {
                res.status(201)
                return res.json(
                    utils.createResponseObject("user created successfully", null, insertedDoc)
                )
            })
            .catch(error => next(error))
    }
)


module.exports = router
