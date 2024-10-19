const express = require("express");
const Product = require("../Models/Products");

// @des: Create product API
// method: POST
// api: /api/products/create
exports.createProduct = async (req, res) => {
  console.log("req body", req.body);
  console.log("req files", req.files);

  try {
    const { category, name, description, price } = req.body;
    if (!req.files || req.files.length === 0) {
      res.status(404).json({ error: true, status: false, message: "images not found" });
      console.log("images not found".red.bold);
      return;
    }
    const images = req.files.map((file) => file.location);
    const newProduct = new Product({ images, category, name, description, price });

    if (newProduct) {
      await newProduct.save();
      console.log("new product =".bold, newProduct);

      res.status(200).json({ error: false, status: true, message: "Product created successfully" });
      console.log("Product created successfully".yellow);
    } else {
      res.status(400).json({ error: true, status: false, message: "Product creation failed" });
      console.log("Product creation failed".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });
    console.log("server error", error);
  }
};

// @des: Update product API
// method: PUT
// api: /api/products/update/:id
exports.updateProduct = async (req, res) => {
  console.log("req params :", req.params);
  console.log("req body :", req.body);
  console.log("req files :", req.files);

  try {
    const { id } = req.params;
    const { category, name, description, price } = req.body;
    if (!req.files || req.files.length === 0) {
      const updatedProduct = await Product.findByIdAndUpdate(id, { category, name, description, price }, { new: true });
      if (!updatedProduct) {
        res.status(404).json({ error: true, status: false, message: "Product not found for updation" });
        console.log("Product not found for updation".red.bold);
        return;
      }
    } else {
      const images = req.files.map((file) => file.location);
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { images, category, name, description, price },
        { new: true }
      );
      if (!updatedProduct) {
        res.status(404).json({ error: true, status: false, message: "Product not found for updation" });
        console.log("Product not found for updation".red.bold);
        return;
      }
    }

    res.status(200).json({ error: false, status: true, message: "Product updated successfully" });
    console.log("Product updated successfully".yellow);
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });
    console.log("server error", error);
  }
};

// @des: Delete product API
// method: DELETE
// api: /api/products/delete/:id
exports.deleteProduct = async (req, res) => {
  console.log("req params :", req.params);
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
      res.status(200).json({ error: false, status: true, message: "Product deleted successfully" });
      console.log("Product deleted successfully".yellow);
    } else {
      res.status(404).json({ error: true, status: false, message: "Product not found for deletion" });
      console.log("Product not found for deletion".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });
    console.log("server error", error);
  }
};

// @des: Get all products API
// method: GET
// api: /api/products/get_products
exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length > 0) {
      res.status(200).json({ error: false, status: true, message: "Products collected successfully",data:products });
      console.log("Products collected successfully".yellow);
    } else {
      res.status(404).json({ error: true, status: false, message: "No products found" });
      console.log("No products found".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });
    console.log("server error", error);
  }
};
