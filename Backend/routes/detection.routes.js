import express from "express";
import verifyToken from "../middleware/authJwt.js";
import { detectTumeur } from "../controllers/detectionTumeur.controller.js";
const router = express.Router();

router.post("/upload", [verifyToken], detectTumeur); //ajouter un rendez vous a un patient donnée

export default router;
