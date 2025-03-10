// Importerer express
import express from "express";
import dbConfig from "../config/dbConfig.js";

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
