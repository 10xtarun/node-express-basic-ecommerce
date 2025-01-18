const express = require("express")
const { validationResult, checkSchema } = require("express-validator")
const utils = require("../utils")
const User = require("../models/user")
const router = express.Router()

router.post("/login", (req, res, next) => {
    const password  = req.body.password

    if(password == "123456") {
        let loginObj = {
            token: "abcd1234"
        }
        res.json(utils.createResponseObject("user login successful", null, loginObj))
    } else {
        res.json(utils.createResponseObject("user login failed", "invalid password", {}))
    }
})


module.exports = router
