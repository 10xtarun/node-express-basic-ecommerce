function createResponseObject(message, error, data) {
    return {
        message: message ? message : "default message",
        error: error ? error : null,
        data: data
    }
}

const MONGO_URI = "mongodb://localhost:27017/"
// "mongodb+srv://10xTarun:8UwM60Y7n0T5B6uP@cluster0.f3zruyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

module.exports = {
    createResponseObject,
    MONGO_URI
}