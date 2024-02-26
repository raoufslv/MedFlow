import express from "express";

import { getAllHistory } from "../controllers/history.controller.js";
import verifyToken from "../middleware/authJwt.js";

const router = express.Router();

router.get("/all", [verifyToken], getAllHistory); //afficher tous les notifications

export default router;