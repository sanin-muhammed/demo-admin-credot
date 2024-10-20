const express = require("express");
const Product = require("../Models/Products");

// @des: Create product API
// method: POST
// api: /api/products/create
exports.createProduct = async (req, res) => {
  console.log("req body", req.body);
  console.log("req files", req.files); // for product images

  try {
    const { category, name, description, price } = req.body;
    // check the files were uploaded
    if (!req.files || req.files.length === 0) {
      res.status(404).json({ error: true, status: false, message: "images not found" });
      console.log("images not found".red.bold);
      return;
    }
    const images = req.files.map((file) => file.location); // Extract the location of each file
    const newProduct = new Product({ images, category, name, description, price }); // create new product

    if (newProduct) {
      await newProduct.save(); // save new product
      console.log("new product =".bold, newProduct);

      res.status(200).json({ error: false, status: true, message: "Product created successfully" }); // success response
      console.log("Product created successfully".yellow);
    } else {
      res.status(400).json({ error: true, status: false, message: "Product creation failed" }); // error response
      console.log("Product creation failed".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" }); // server error response
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
    // check the files were uploaded
    if (!req.files || req.files.length === 0) {
      const updatedProduct = await Product.findByIdAndUpdate(id, { category, name, description, price }, { new: true }); // find the product by id and update without images
      if (!updatedProduct) {
        res.status(404).json({ error: true, status: false, message: "Product not found for updation" }); // error response
        console.log("Product not found for updation".red.bold);
        return;
      }
    } else {
      const images = req.files.map((file) => file.location); // Extract the location of each file
      // find the product by id and update with images
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { images, category, name, description, price },
        { new: true }
      );
      if (!updatedProduct) {
        res.status(404).json({ error: true, status: false, message: "Product not found for updation" }); // error response
        console.log("Product not found for updation".red.bold);
        return;
      }
    }

    res.status(200).json({ error: false, status: true, message: "Product updated successfully" }); // success response
    console.log("Product updated successfully".yellow);
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" }); // server error response
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

    const deletedProduct = await Product.findByIdAndDelete(id); // find product by id and delete the product

    if (deletedProduct) {
      res.status(200).json({ error: false, status: true, message: "Product deleted successfully" }); // success response
      console.log("Product deleted successfully".yellow);
    } else {
      res.status(404).json({ error: true, status: false, message: "Product not found for deletion" }); // error response
      console.log("Product not found for deletion".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" }); // server error response
    console.log("server error", error);
  }
};

// @des: Get all products API
// method: GET
// api: /api/products/get_products
exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find(); // find all products

    if (products.length > 0) {
      res.status(200).json({ error: false, status: true, message: "Products collected successfully", data: products }); // success response
      console.log("Products collected successfully".yellow);
    } else {
      res.status(404).json({ error: true, status: false, message: "No products found" }); // error response
      console.log("No products found".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" }); // server error response
    console.log("server error", error);
  }
};
