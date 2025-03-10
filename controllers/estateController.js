// Importerer express og testModel
import express from "express";
import { estateModel } from "../models/estateModel.js";

// Opretter en router
export const estateController = express.Router();

// READ: Route til at hente liste
estateController.get("/estates", async (req, res) => {
  try {
    const data = await estateModel.findAll({});

    if (!data || data.length === 0) {
      res.json({ message: "Error: No estates" });
    }
    res.json(data);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
estateController.get("/estates/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await estateModel.findOne({
      where: { id: id },
    });

    if (!result) {
      return res.status(404).json({ message: "Error: estates not found" });
    }

    res.json(result);
  } catch (error) {
    res.json("Error: Failed to get estate" + error);
  }
});

// CREATE: Route til at oprette
estateController.post("/estates", async (req, res) => {
  try {
    const result = await estateModel.create(req.body);
    res.status(201).json({ message: "Estate was created", content: result });
  } catch (error) {
    const errorMessage = "Could not create estate";
    console.error("Error when creating estate:", error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// UPDATE: Route til at opdatere
estateController.put("/estates/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await estateModel.update(req.body, {
      where: { id },
    });

    res.json({
      message: `Estates ID#${id} was updated`,
    });
  } catch (error) {
    const errorMessage = "Could not update estate";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// DELETE: Route til at slette
estateController.delete("/estates/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    await estateModel.destroy({
      where: { id },
    });

    res.json({
      message: `Estate ID#${id} was deleted`,
    });
  } catch (error) {
    const errorMessage = "Could not delete estate";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});
