const express = require("express");
const {  getAllOrders, updateOrderStatus } = require("../Controller/OrderController");
const router = express.Router();

router.get("/getOrders", getAllOrders); // get all orders API
router.patch("/update/:id", updateOrderStatus); // update order status API

module.exports = router;
