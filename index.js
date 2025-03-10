import express from "express";
import dotenv from "dotenv";

import dbConfig from "./config/dbConfig.js";

import { dbController } from "./controllers/dbController.js";

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(dbController);

app.get("/", (req, res) => {
  res.send("Hej verden!");
});

app.get("*", (req, res) => {
  res.status(200).json({
    message: "404 - File not found",
  });
});

app.listen(port, () => {
  console.log("Express server kører....");
  console.log(`http://localhost:${port}`);
});
