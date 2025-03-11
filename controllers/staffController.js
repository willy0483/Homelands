// Importerer express og testModel
import express from "express";
import { staffModel } from "../models/staffModel.js";

// Opretter en router
export const staffController = express.Router();

// READ: Route til at hente liste
staffController.get("/staffs", async (req, res) => {
  try {
    const data = await staffModel.findAll({});

    if (!data || data.length === 0) {
      res.json({ message: "Error: No staffs" });
    }
    res.json(data);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
staffController.get("/staffs/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await staffModel.findOne({
      where: { id: id },
    });

    if (!result) {
      return res.status(404).json({ message: "Error: staffs not found" });
    }

    res.json(result);
  } catch (error) {
    res.json("Error: Failed to get city" + error);
  }
});

// CREATE: Route til at oprette
staffController.post("/staffs", async (req, res) => {
  try {
    let { firstname, lastname, position, image, phone, email } = req.body;

    const result = await staffModel.create({
      firstname,
      lastname,
      position,
      image,
      phone,
      email,
    });
    res.status(201).json({ message: "Staff was created", content: result });
  } catch (error) {
    const errorMessage = "Could not create staff";
    console.error("Error when creating staff:", error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// UPDATE: Route til at opdatere
staffController.put("/staffs/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await staffModel.update(req.body, {
      where: { id },
    });

    res.json({
      message: `Staffs ID#${id} was updated`,
    });
  } catch (error) {
    const errorMessage = "Could not update staff";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// DELETE: Route til at slette
staffController.delete("/staffs/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    await staffModel.destroy({
      where: { id },
    });

    res.json({
      message: `Staffs ID#${id} was deleted`,
    });
  } catch (error) {
    const errorMessage = "Could not delete staff";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});
