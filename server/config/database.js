import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

const connect = asyncHandler(async () => {
  const db = await mongoose.connect(process.env.DATABASE_URI);
  console.log("Connected to the database ...".cyan.underline);
  return db;
});

export default connect;
