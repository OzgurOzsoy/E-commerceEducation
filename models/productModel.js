const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Product is required!"]
    },
    price: {
        type: Number,
        required:[true, "Price is required"]
    },
    quantity: {
        type: Number,
        required:[true, "Quantity is required"]
    },
    image: {
        type: String,
        required:[true, "Image is required"]
    }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product