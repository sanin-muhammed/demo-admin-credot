const Order = require("../Models/Order");

// @des: Get all orders API
// method: GET
// api: /api/order/:userId
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
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

      res.status(200).json({ error: false, status: true, message: "Orders collected successful", data: orders });
      console.log("Orders collected successful".yellow);
    } else {
      res.status(400).json({ error: true, status: false, message: "Orders not found" });
      console.log("Orders not found".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });
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

    const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus });
    if (updatedOrder) {
      console.log("updatedOrder =".bold, updatedOrder);

      res.status(200).json({ error: false, status: true, message: "Order status updated successfully" });
      console.log("Order status updated successfully".yellow);
    } else {
      res.status(400).json({ error: true, status: false, message: "Order updation failed" });
      console.log("Order updation failed".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });
    console.log("server error", error);
  }
};
