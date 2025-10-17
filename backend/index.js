import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { app } from "./app.js";
import connect_db from "./src/db/connectdb.js";
const PORT = process.env.PORT;
connect_db();

