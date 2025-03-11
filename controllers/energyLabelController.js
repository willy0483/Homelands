// Importerer express og testModel
import express from "express";
import { energyLabelModel } from "../models/energyLabelModel.js";

// Opretter en router
export const energyLabelController = express.Router();

// READ: Route til at hente liste
energyLabelController.get("/energylabels", async (req, res) => {
  try {
    const data = await energyLabelModel.findAll({});

    if (!data || data.length === 0) {
      res.json({ message: "Error: No energyLabels" });
    }
    res.json(data);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
energyLabelController.get("/energylabels/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await energyLabelModel.findOne({
      where: { id: id },
    });

    if (!result) {
      return res.status(404).json({ message: "Error: energyLabels not found" });
    }

    res.json(result);
  } catch (error) {
    res.json("Error: Failed to get energyLabel" + error);
  }
});

// CREATE: Route til at oprette
energyLabelController.post("/energylabels", async (req, res) => {
  try {
    let { name } = req.body;

    const result = await energyLabelModel.create({ name });
    res.status(201).json({ message: "City was created", content: result });
  } catch (error) {
    const errorMessage = "Could not create energyLabel";
    console.error("Error when creating energyLabel:", error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// UPDATE: Route til at opdatere
energyLabelController.put("/energylabels/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await energyLabelModel.update(req.body, {
      where: { id },
    });

    res.json({
      message: `EnergyLabel ID#${id} was updated`,
    });
  } catch (error) {
    const errorMessage = "Could not update energyLabel";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// DELETE: Route til at slette
energyLabelController.delete("/energylabels/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    await energyLabelModel.destroy({
      where: { id },
    });

    res.json({
      message: `EnergyLabel ID#${id} was deleted`,
    });
  } catch (error) {
    const errorMessage = "Could not delete energyLabel";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});
