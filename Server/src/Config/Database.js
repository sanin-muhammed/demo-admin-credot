const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.on("disconnected", () => console.log("Database disConnected ".bold));
  db.on("connected", () => console.log("Database Connected Successfully".bold.brightGreen));
};

module.exports = connectDB;
