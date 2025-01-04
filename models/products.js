const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        discount: {
            type: Number
        },
        rating: {
            type: Number
        }
    }
)

const Product = mongoose.model("product", productSchema)

module.exports = Product