// Importerer express og testModel
import express from "express";
import { estateImageRelModel } from "../models/estateImageRelModel.js";
import { imageModel } from "../models/imageModel.js";
import { estateModel } from "../models/estateModel.js";

// Opretter en router
export const estateImageRelController = express.Router();

// READ: Route til at hente liste
estateImageRelController.get("/estateimagerels", async (req, res) => {
  try {
    const data = await estateImageRelModel.findAll({
      attributes: { exclude: ["image_id", "estate_id"] },
      include: [
        {
          model: imageModel,
        },
        {
          model: estateModel,
        },
      ],
    });

    if (!data || data.length === 0) {
      res.json({ message: "Error: No estateImageRels" });
    }
    res.json(data);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
estateImageRelController.get(
  "/estateimagerels/:id([0-9]*)",
  async (req, res) => {
    try {
      const { id } = req.params;

      let result = await estateImageRelModel.findOne({
        where: { id: id },
        attributes: { exclude: ["image_id", "estate_id"] },
        include: [
          {
            model: imageModel,
          },
          {
            model: estateModel,
          },
        ],
      });

      if (!result) {
        return res
          .status(404)
          .json({ message: "Error: estateImageRels not found" });
      }

      res.json(result);
    } catch (error) {
      res.json("Error: Failed to get estateImageRel" + error);
    }
  },
);

// CREATE: Route til at oprette
estateImageRelController.post("/estateimagerels", async (req, res) => {
  try {
    let { image_id, estate_id, is_main } = req.body;

    const result = await estateImageRelModel.create({
      image_id,
      estate_id,
      is_main,
    });
    res
      .status(201)
      .json({ message: "estateimagerel was created", content: result });
  } catch (error) {
    const errorMessage = "Could not create estateImageRel";
    console.error("Error when creating estateImageRel:", error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// UPDATE: Route til at opdatere
estateImageRelController.put(
  "/estateimagerels/:id([0-9]*)",
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await estateImageRelModel.update(req.body, {
        where: { id },
      });

      res.json({
        message: `EstateImageRel ID#${id} was updated`,
      });
    } catch (error) {
      const errorMessage = "Could not update estateImageRel";
      console.error(errorMessage, error);
      res.status(500).json({ message: errorMessage, content: error.message });
    }
  },
);

// DELETE: Route til at slette
estateImageRelController.delete(
  "/estateimagerels/:id([0-9]*)",
  async (req, res) => {
    try {
      const { id } = req.params;

      await estateImageRelModel.destroy({
        where: { id },
      });

      res.json({
        message: `estateImageRel ID#${id} was deleted`,
      });
    } catch (error) {
      const errorMessage = "Could not delete estateImageRel";
      console.error(errorMessage, error);
      res.status(500).json({ message: errorMessage, content: error.message });
    }
  },
);
