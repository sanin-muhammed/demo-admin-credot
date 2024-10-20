const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./src/Config/Database");
const ProductRoutes = require("./src/Routes/ProductRoutes");
const OrderRoutes = require("./src/Routes/OrderRoutes");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan("dev"));

connectDB(); // connect database

// Setting up API endpoints
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.listen(PORT, () => {
  console.log("server running on port".bold, PORT.yellow.bold);
});
