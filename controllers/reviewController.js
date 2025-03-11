// Importerer express og testModel
import express from "express";
import { reviewModel } from "../models/reviewModel.js";
import { estateModel } from "../models/estateModel.js";
import { userModel } from "../models/userModel.js";

// Opretter en router
export const reviewController = express.Router();

// READ: Route til at hente liste
reviewController.get("/reviews", async (req, res) => {
  try {
    const data = await reviewModel.findAll({
      attributes: { exclude: ["estate_id", "user_id"] },
      include: [
        {
          model: estateModel,
        },
        {
          model: userModel,
        },
      ],
    });

    if (!data || data.length === 0) {
      res.json({ message: "Error: No reviews" });
    }
    res.json(data);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
reviewController.get("/reviews/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await reviewModel.findOne({
      where: { id: id },
      attributes: { exclude: ["estate_id", "user_id"] },
      include: [
        {
          model: estateModel,
        },
        {
          model: userModel,
        },
      ],
    });

    if (!result) {
      return res.status(404).json({ message: "Error: reviews not found" });
    }

    res.json(result);
  } catch (error) {
    res.json("Error: Failed to get review" + error);
  }
});

// CREATE: Route til at oprette
reviewController.post("/reviews", async (req, res) => {
  try {
    let { subject, comment, num_stars, date, estate_id, user_id, is_active } =
      req.body;

    const result = await reviewModel.create({
      subject,
      comment,
      num_stars,
      date,
      estate_id,
      user_id,
      is_active,
    });
    res.status(201).json({ message: "review was created", content: result });
  } catch (error) {
    const errorMessage = "Could not create review";
    console.error("Error when creating review:", error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// UPDATE: Route til at opdatere
reviewController.put("/reviews/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await reviewModel.update(req.body, {
      where: { id },
    });

    res.json({
      message: `Review ID#${id} was updated`,
    });
  } catch (error) {
    const errorMessage = "Could not update review";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// DELETE: Route til at slette
reviewController.delete("/reviews/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    await reviewModel.destroy({
      where: { id },
    });

    res.json({
      message: `Review ID#${id} was deleted`,
    });
  } catch (error) {
    const errorMessage = "Could not delete review";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});
