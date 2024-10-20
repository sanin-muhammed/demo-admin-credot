const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./src/Config/Database");
const ProductRoutes = require("./src/Routes/ProductRoutes");
const OrderRoutes = require("./src/Routes/OrderRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 2003;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Middleware to serve the Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

connectDB(); // Connect to the database

// Setting up API endpoints
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.listen(PORT, () => {
  console.log("Server running on port".bold, PORT.yellow.bold);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
