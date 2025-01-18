const { Schema, default: mongoose } = require("mongoose");
const User = require("./user");
const Product = require("./products");

const orderSchema = Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    }
})

const Orders = mongoose.model("order", orderSchema)

module.exports = Orders