const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI); // connect database
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: ")); // database connection error
  db.on("disconnected", () => console.log("Database disConnected ".bold)); // database disconnected
  db.on("connected", () => console.log("Database Connected Successfully".bold.brightGreen)); // database connected
};

module.exports = connectDB; // export connecting function
