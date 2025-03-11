// Importerer express og testModel
import express from "express";
import { imageModel } from "../models/imageModel.js";

// Opretter en router
export const imageController = express.Router();

// READ: Route til at hente liste
imageController.get("/images", async (req, res) => {
  try {
    const data = await imageModel.findAll({});

    if (!data || data.length === 0) {
      res.json({ message: "Error: No images" });
    }
    res.json(data);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
imageController.get("/images/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await imageModel.findOne({
      where: { id: id },
    });

    if (!result) {
      return res.status(404).json({ message: "Error: images not found" });
    }

    res.json(result);
  } catch (error) {
    res.json("Error: Failed to get image" + error);
  }
});

// CREATE: Route til at oprette
imageController.post("/images", async (req, res) => {
  try {
    let { filename, author, description } = req.body;

    const result = await imageModel.create({ filename, author, description });
    res.status(201).json({ message: "Image was created", content: result });
  } catch (error) {
    const errorMessage = "Could not create image";
    console.error("Error when creating image:", error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// UPDATE: Route til at opdatere
imageController.put("/images/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await imageModel.update(req.body, {
      where: { id },
    });

    res.json({
      message: `Image ID#${id} was updated`,
    });
  } catch (error) {
    const errorMessage = "Could not update image";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// DELETE: Route til at slette
imageController.delete("/images/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    await imageModel.destroy({
      where: { id },
    });

    res.json({
      message: `Imagege ID#${id} was deleted`,
    });
  } catch (error) {
    const errorMessage = "Could not delete image";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});
