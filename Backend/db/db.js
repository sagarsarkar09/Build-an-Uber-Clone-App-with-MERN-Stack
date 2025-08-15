const mongoose = require("mongoose");

function connectToDb() {
  const uri = process.env.DB_CONNECT;
  console.log("📡 Trying to connect to MongoDB:", uri);

  mongoose
    .connect(uri)
    .then(() => {
      console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });
}

module.exports = connectToDb;
