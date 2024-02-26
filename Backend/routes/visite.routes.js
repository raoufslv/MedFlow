import express from "express";
import verifyToken from "../middleware/authJwt.js";
import {
  getVisites,
  addVisite,
  getVisiteById,
  updateVisite,
  deleteVisite,
} from "../controllers/visite.controller.js";

const router = express.Router();

router.get("/:idP/all", [verifyToken], getVisites);
router.post("/:idP/add", [verifyToken], addVisite);
router.get("/:idP/:idV", [verifyToken], getVisiteById);
router.put("/:idP/:idV", [verifyToken], updateVisite);
router.delete("/:idP/:idV", [verifyToken], deleteVisite);

export default router;
