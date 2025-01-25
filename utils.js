const jwt = require("jsonwebtoken")
function createResponseObject(message, error, data) {
    return {
        message: message ? message : "default message",
        error: error ? error : null,
        data: data
    }
}

function authVerification(req, res, next) {
    try {
        console.log("==authToken ", req.headers.authorization)
        const receivedToken = req.headers.authorization.split(' ')[1]
        const verifiedJwt = jwt.verify(receivedToken, process.env.SECRET_KEY)
        console.log("==verified ", verifiedJwt)
        req.userEmail = verifiedJwt.email
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createResponseObject,
    authVerification
    // MONGO_URI
}