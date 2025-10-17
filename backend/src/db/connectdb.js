import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { MongoClient } from "mongodb";
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const dbName = process.env.DB_NAME;

async function connect_db() {
  try {
    const response = await client.connect();
    console.log("Database Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("documents");
    return response;
  } catch (error) {
    console.log("Some error occured during database connection", error);
    // throw new error();
  }
}
export default connect_db;
