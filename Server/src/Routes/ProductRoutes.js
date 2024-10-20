const express = require("express");
const { createProduct, updateProduct, deleteProduct, allProducts } = require("../Controller/ProductController");
const { upload } = require("../Utils/s3bucket");
const router = express.Router();

router.get("/get_products", allProducts); // get all products API
router.post("/create", upload.array("images", 10), createProduct); // create product API
router.put("/update/:id", upload.array("images", 10), updateProduct); // update product API
router.delete("/delete/:id", deleteProduct); // delete product API

module.exports = router;
