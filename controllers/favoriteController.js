// Importerer express og testModel
import express from "express";
import { favoriteModel } from "../models/favoriteModel.js";
import { userModel } from "../models/userModel.js";
import { estateModel } from "../models/estateModel.js";
import { estateTypeModel } from "../models/estateTypeModel.js";

// Opretter en router
export const favoriteController = express.Router();

// READ: Route til at hente liste
favoriteController.get("/favorites", async (req, res) => {
  try {
    const data = await favoriteModel.findAll({
      attributes: { exclude: ["user_id", "estate_id"] },
      include: [
        {
          model: userModel,
        },
        {
          model: estateModel,
        },
      ],
    });

    if (!data || data.length === 0) {
      res.json({ message: "Error: No favorites" });
    }
    res.json(data);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
favoriteController.get("/favorites/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await favoriteModel.findOne({
      where: { id: id },
      attributes: { exclude: ["user_id", "estate_id"] },
      include: [
        {
          model: userModel,
        },
        {
          model: estateModel,
        },
      ],
    });

    if (!result) {
      return res.status(404).json({ message: "Error: favorites not found" });
    }

    res.json(result);
  } catch (error) {
    res.json("Error: Failed to get  favorite" + error);
  }
});

// CREATE: Route til at oprette
favoriteController.post("/favorites", async (req, res) => {
  try {
    let { user_id, estate_id } = req.body;

    const result = await favoriteModel.create({ user_id, estate_id });
    res.status(201).json({ message: "Favorite was created", content: result });
  } catch (error) {
    const errorMessage = "Could not create  favorite";
    console.error("Error when creating  favorite:", error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// UPDATE: Route til at opdatere
favoriteController.put("/favorites/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await favoritesModel.update(req.body, {
      where: { id },
    });

    res.json({
      message: `Favorites ID#${id} was updated`,
    });
  } catch (error) {
    const errorMessage = "Could not update favorite";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// DELETE: Route til at slette
favoriteController.delete("/favorites/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    await favoriteModel.destroy({
      where: { id },
    });

    res.json({
      message: `Favorite ID#${id} was deleted`,
    });
  } catch (error) {
    const errorMessage = "Could not delete favorite";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});
