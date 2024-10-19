const express = require("express");
const {  getAllOrders, updateOrderStatus } = require("../Controller/OrderController");
const router = express.Router();

router.get("/getOrders", getAllOrders);
router.patch("/update/:id", updateOrderStatus);

module.exports = router;
