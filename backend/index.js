import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app.js";
import connect_db from "./src/db/connectdb.js";
const PORT = process.env.PORT;
connect_db()
  .then(() => {
    app.on("error", () => {
      console.log("An error occured", error);
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
