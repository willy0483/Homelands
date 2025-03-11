// Importerer express og testModel
import express from "express";
import { estateTypeModel } from "../models/estateTypeModel.js";

// Opretter en router
export const estateTypeController = express.Router();

// READ: Route til at hente liste
estateTypeController.get("/estatetypes", async (req, res) => {
  try {
    const data = await estateTypeModel.findAll({});

    if (!data || data.length === 0) {
      res.json({ message: "Error: No estatetypes" });
    }
    res.json(data);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
estateTypeController.get("/estatetypes/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await estateTypeModel.findOne({
      where: { id: id },
    });

    if (!result) {
      return res.status(404).json({ message: "Error: estatetypes not found" });
    }

    res.json(result);
  } catch (error) {
    res.json("Error: Failed to get  estateType" + error);
  }
});

// CREATE: Route til at oprette
estateTypeController.post("/estatetypes", async (req, res) => {
  try {
    let { name } = req.body;

    const result = await estateTypeModel.create({ name });
    res
      .status(201)
      .json({ message: "Estatetype was created", content: result });
  } catch (error) {
    const errorMessage = "Could not create  estateType";
    console.error("Error when creating  estateType:", error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// UPDATE: Route til at opdatere
estateTypeController.put("/ estatetypes/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await estateTypeModel.update(req.body, {
      where: { id },
    });

    res.json({
      message: `EstateType ID#${id} was updated`,
    });
  } catch (error) {
    const errorMessage = "Could not update  estateType";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// DELETE: Route til at slette
estateTypeController.delete("/estatetypes/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    await estateTypeModel.destroy({
      where: { id },
    });

    res.json({
      message: `EstateType ID#${id} was deleted`,
    });
  } catch (error) {
    const errorMessage = "Could not delete estateType";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});
