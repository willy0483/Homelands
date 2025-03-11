// Importerer express og testModel
import express from "express";
import { cityModel } from "../models/cityModel.js";

// Opretter en router
export const cityController = express.Router();

// READ: Route til at hente liste
cityController.get("/cities", async (req, res) => {
  try {
    const data = await cityModel.findAll({});

    if (!data || data.length === 0) {
      res.json({ message: "Error: No cities" });
    }
    res.json(data);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
cityController.get("/cities/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await cityModel.findOne({
      where: { id: id },
    });

    if (!result) {
      return res.status(404).json({ message: "Error: cities not found" });
    }

    res.json(result);
  } catch (error) {
    res.json("Error: Failed to get city" + error);
  }
});

// CREATE: Route til at oprette
cityController.post("/cities", async (req, res) => {
  try {
    let { zipcode, name } = req.body;

    const result = await cityModel.create({ zipcode, name });
    res.status(201).json({ message: "City was created", content: result });
  } catch (error) {
    const errorMessage = "Could not create city";
    console.error("Error when creating city:", error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// UPDATE: Route til at opdatere
cityController.put("/cities/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await cityModel.update(req.body, {
      where: { id },
    });

    res.json({
      message: `Cities ID#${id} was updated`,
    });
  } catch (error) {
    const errorMessage = "Could not update city";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// DELETE: Route til at slette
cityController.delete("/cities/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    await cityModel.destroy({
      where: { id },
    });

    res.json({
      message: `Cities ID#${id} was deleted`,
    });
  } catch (error) {
    const errorMessage = "Could not delete city";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});
