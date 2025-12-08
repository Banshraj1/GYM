import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "./.env" });
import { MongoClient } from "mongodb";
const url = process.env.MONGODB_URI;
// const client = new MongoClient(url);
// const dbName = process.env.DB_NAME;

async function connect_db() {
  try {
    const response = await mongoose.connect(url);
    console.log("Database Connected successfully to server");
    return response;
  } catch (error) {
    console.log("Some error occurred during database connection", error);
    // throw new error();
  }
}
export default connect_db;
