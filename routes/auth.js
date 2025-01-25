const express = require("express")
const { validationResult, checkSchema } = require("express-validator")
const utils = require("../utils")
const User = require("../models/user")
const router = express.Router()



router.post(
    "/register",
    checkSchema({
        email: {
            notEmpty: {
                errorMessage: "email should not be empty"
            },
            isEmail: {
                errorMessage: "email should be proper or valid value"
            }
        },
        password: {
            notEmpty: {
                errorMessage: "password should not be empty"
            },
            isLength: {
                options: {
                    min: 8,
                },
                errorMessage: "password should be of minimun 8 characters"
            },
            isStrongPassword: {
                errorMessage: "password should be of strong combination"
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
                    utils.createResponseObject("user updated successfully", null, insertedDoc)
                )
            })
            .catch(error => next(error))
    }
)



router.post(
    "/login", 
    checkSchema({
        email: {
            notEmpty: {
                errorMessage: "email should not be empty"
            },
            isEmail: {
                errorMessage: "email should be proper or valid value"
            }
        },
        password: {
            notEmpty: {
                errorMessage: "password should not be empty"
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

        return User.findOne({email: req.body.email })
        .then(existingUser => {
            if(!existingUser) {
                throw Error("user not found")
            }

            if(req.body.password == existingUser.password) {
                return existingUser
            } else {
                throw Error("invalid password")
            }
        })
        .catch(next)

    
        // res.json(utils.createResponseObject("user login successful", null, loginObj))
    
        // res.json(utils.createResponseObject("user login failed", "invalid password", {}))
    
})


module.exports = router
