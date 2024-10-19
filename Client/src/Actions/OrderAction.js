import axios from "../config/axiosConfig";

// get all orders Action
export const getAllOrdersAction = async () => {
  try {
    const response = await axios.get("/orders/getOrders");
    console.log("getAllOrdersAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("getAllOrdersAction api error response : ", error.response.data);
    return error.response.data;
  }
};
// update order status Action
export const updateOrderStatusAction = async (orderStatus, id) => {
  try {
    const response = await axios.patch(`/orders/update/${id}`, { orderStatus });
    console.log("updateOrderStatusAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("updateOrderStatusAction api error response : ", error.response.data);
    return error.response.data;
  }
};
