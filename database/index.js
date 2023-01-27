const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.MONGODB_URL || "";

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database is successfully connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connect;
