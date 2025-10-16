import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT;
const app = express();
// const PORT
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(PORT, () => {
  console.log(`App is listenning iver port ${PORT}`);
});
