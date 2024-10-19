const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  images: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
