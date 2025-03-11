// Importerer express
import express from "express";
import dbConfig from "../config/dbConfig.js";

import { seedFromCsv } from "../utils/seedUtils.js";
import { cityModel } from "../models/cityModel.js";
import { staffModel } from "../models/staffModel.js";
import { estateModel } from "../models/estateModel.js";
import { userModel } from "../models/userModel.js";
import { energyLabelModel } from "../models/energyLabelModel.js";
import { estateTypeModel } from "../models/estateTypeModel.js";
import { favoriteModel } from "../models/favoriteModel.js";
import { imageModel } from "../models/imageModel.js";
import { estateImageRelModel } from "../models/estateImageRelModel.js";
import { reviewModel } from "../models/reviewModel.js";

export const dbController = express.Router();

dbController.get("/test", async (req, res) => {
  try {
    await dbConfig.authenticate();
    res.send("Connection success");
  } catch (error) {
    res.send(error);
  }
});

dbController.get("/sycn", async (req, res) => {
  try {
    await dbConfig.sync({ force: true });
    res.send("Data successfully synchronized");
  } catch (err) {
    res.send(err);
  }
});

// Seed database fra CSV filer
dbController.get("/seedfromcsv", async (req, res) => {
  try {
    // Indsæt data fra CSV filer til de respektive modeller
    await seedFromCsv("city.csv", cityModel);
    await seedFromCsv("staff.csv", staffModel);
    await seedFromCsv("energy-label.csv", energyLabelModel);
    await seedFromCsv("estate-type.csv", estateTypeModel);
    await seedFromCsv("user.csv", userModel);
    await seedFromCsv("estate.csv", estateModel);
    await seedFromCsv("favorite.csv", favoriteModel);
    await seedFromCsv("image.csv", imageModel);
    await seedFromCsv("estate-image-rel.csv", estateImageRelModel);
    await seedFromCsv("review.csv", reviewModel);

    // Send succes respons
    res.send({ message: "Seeding completed" });
  } catch (err) {
    // Fejlhåndtering med respons
    res.status(500).json({ error: err.message });
  }
});
