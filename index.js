import express from "express";
import dotenv from "dotenv";

import dbConfig from "./config/dbConfig.js";

// importerer controller
import { dbController } from "./controllers/dbController.js";
import { estateController } from "./controllers/estateController.js";
import { userController } from "./controllers/userController.js";
import { cityController } from "./controllers/cityController.js";
import { energyLabelController } from "./controllers/energyLabelController.js";
import { estateTypeController } from "./controllers/estateTypeController.js";
import { favoriteController } from "./controllers/favoriteController.js";
import { imageController } from "./controllers/imageController.js";
import { estateImageRelController } from "./controllers/estateImageRelController.js";
import { staffController } from "./controllers/staffController.js";
import { reviewController } from "./controllers/reviewController.js";

// login
import { authController } from "./controllers/authController.js";

// importerer modeller
import "./models/estateModel.js";
import "./models/userModel.js";
import "./models/cityModel.js";
import "./models/energyLabelModel.js";
import "./models/estateTypeModel.js";
import "./models/favoriteModel.js";
import "./models/imageModel.js";
import "./models/estateImageRelModel.js";
import "./models/staffModel.js";
import "./models/reviewModel.js";

import { setRelations } from "./models/relations.js";

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: true }));

setRelations();

app.use(
  dbController,
  cityController,
  energyLabelController,
  estateTypeController,
  favoriteController,
  imageController,
  estateController,
  estateImageRelController,
  reviewController,
  staffController,
  userController,
  authController,
);

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
