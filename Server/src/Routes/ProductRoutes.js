const express = require("express");
const { createProduct, updateProduct, deleteProduct, allProducts } = require("../Controller/ProductController");
const { upload } = require("../Utils/s3bucket");
const router = express.Router();

router.get("/get_products", allProducts);
router.post("/create",upload.array("images", 10), createProduct);
router.put("/update/:id",upload.array("images", 10), updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
