const mongoose = require("mongoose");

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to db successfully");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

dbConnect();
