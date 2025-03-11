import express from "express";
import { Authenticate, Authorize } from "../utils/authUtils.js";

// Opretter en router til authentication
export const authController = express.Router();

// Route til login, kalder Authenticate-funktionen
authController.post("/login", (req, res) => {
  Authenticate(req, res);
});

// Route til autorisation, kun tilgængelig for autoriserede brugere
authController.get("/authorize", Authorize, (req, res, next) => {
  res.send({ message: `You are logged in` });
});
