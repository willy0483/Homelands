import express from "express";
import dotenv from "dotenv";

import dbConfig from "./config/dbConfig.js";

// importerer controller
import { dbController } from "./controllers/dbController.js";
import { estateController } from "./controllers/estateController.js";

// importerer modeller
import "./models/estateModel.js";

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(dbController, estateController);

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
