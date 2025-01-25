function createResponseObject(message, error, data) {
    return {
        message: message ? message : "default message",
        error: error ? error : null,
        data: data
    }
}

module.exports = {
    createResponseObject,
    // MONGO_URI
}