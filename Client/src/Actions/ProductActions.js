import axios from "../config/axiosConfig";

// Get all Products Action
export const getAllProductsAction = async () => {
  try {
    const response = await axios.get("/products/get_products");
    console.log("getAllProductsAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("getAllProductsAction api error response : ", error.response.data);
    return error.response.data;
  }
};
// Create Product Action
export const createProductAction = async (formData) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  try {
    const response = await axios.post("/products/create", formData, { headers });
    console.log("createProductAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("createProductAction api error response : ", error.response.data);
    return error.response.data;
  }
};

// Update Product Action
export const updateProductAction = async (formData, id) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  try {
    const response = await axios.put(`/products/update/${id}`, formData, { headers });
    console.log("updateProductAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("updateProductAction api error response : ", error.response.data);
    return error.response.data;
  }
};

// Delete Product Action
export const deleteProductAction = async (id) => {
  try {
    const response = await axios.delete(`/products/delete/${id}`);
    console.log("deleteProductAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("deleteProductAction api error response : ", error.response.data);
    return error.response.data;
  }
};
