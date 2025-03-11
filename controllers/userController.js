// Importerer express og testModel
import express from "express";
import { userModel } from "../models/userModel.js";

// Opretter en router
export const userController = express.Router();

// READ: Route til at hente liste
userController.get("/users", async (req, res) => {
  try {
    const data = await userModel.findAll({});

    if (!data || data.length === 0) {
      res.json({ message: "Error: No user" });
    }
    res.json(data);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
userController.get("/users/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await userModel.findOne({
      where: { id: id },
    });

    if (!result) {
      return res.status(404).json({ message: "Error: user not found" });
    }

    res.json(result);
  } catch (error) {
    res.json("Error: Failed to get user " + error);
  }
});

// CREATE: Route til at oprette
userController.post("/users", async (req, res) => {
  try {
    let { firstname, lastname, email, password, refresh_token, is_active } =
      req.body;

    const result = await userModel.create({
      firstname,
      lastname,
      email,
      password,
      refresh_token,
      is_active,
    });
    res.status(201).json({ message: "user was created", content: result });
  } catch (error) {
    const errorMessage = "Could not create user";
    console.error("Error when creating user:", error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// UPDATE: Route til at opdatere
userController.put("/users/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await userModel.update(req.body, {
      where: { id },
    });

    res.json({
      message: `user ID#${id} was updated`,
    });
  } catch (error) {
    const errorMessage = "Could not update user";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// DELETE: Route til at slette
userController.delete("/users/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    await userModel.destroy({
      where: { id },
    });

    res.json({
      message: `user ID#${id} was deleted`,
    });
  } catch (error) {
    const errorMessage = "Could not delete user";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});
