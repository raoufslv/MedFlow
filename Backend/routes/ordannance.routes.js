import express from "express";
import verifyToken from "../middleware/authJwt.js";
import {
  getOrdonnances,
  addOrdonnance,
  getOrdonnanceById,
  updateOrdonnance,
  deleteOrdonnance,
} from "../controllers/ordonnance.controller.js";

const router = express.Router();

router.get("/:idP/:idV/all", [verifyToken], getOrdonnances);
router.post("/:idP/:idV/add", [verifyToken], addOrdonnance);
router.get("/:idP/:idV/:idO", [verifyToken], getOrdonnanceById);
router.put("/:idP/:idV/:idO", [verifyToken], updateOrdonnance);
router.delete("/:idP/:idV/:idO", [verifyToken], deleteOrdonnance);

export default router;
