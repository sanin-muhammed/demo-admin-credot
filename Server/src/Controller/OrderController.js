const Order = require("../Models/Order");

// @des: Get all orders API
// method: GET
// api: /api/order/:userId
exports.getAllOrders = async (req, res) => {
  try {
    // find orders and add userDetails using userId
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id", // userId field in the users collection
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    if (orders && orders.length > 0) {
      console.log("Orders =".bold, orders);

      res.status(200).json({ error: false, status: true, message: "Orders collected successful", data: orders }); // success response
      console.log("Orders collected successful".yellow);
    } else {
      res.status(400).json({ error: true, status: false, message: "Orders not found" }); // error response
      console.log("Orders not found".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" }); // server error response
    console.log("server error", error);
  }
};

// @des: Update order status API
// method: PATCH
// api: /api/order/update/:id
exports.updateOrderStatus = async (req, res) => {
  console.log("req params =", req.params);
  console.log("req body =", req.body);
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus }); // find order using order id and update order status
    if (updatedOrder) {
      console.log("updatedOrder =".bold, updatedOrder);

      res.status(200).json({ error: false, status: true, message: "Order status updated successfully" }); // success response
      console.log("Order status updated successfully".yellow);
    } else {
      res.status(400).json({ error: true, status: false, message: "Order updation failed" }); // error response
      console.log("Order updation failed".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" }); // server error response
    console.log("server error", error);
  }
};
