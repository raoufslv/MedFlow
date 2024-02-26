import express from "express";
import verifyToken from "../middleware/authJwt.js";
import {
  addRendezVous,
  deleteRendezVous,
  updaterendezVous,
  getAllrendez,
  getRendezVousById,
} from "../controllers/rendezvous.controller.js";
const router = express.Router();

router.get("/all", [verifyToken], getAllrendez); //afficher tous les rendez vous
router.post("/:idP/add", [verifyToken], addRendezVous); //ajouter un rendez vous a un patient donnée
router.get("/:idP/:idR", [verifyToken], getRendezVousById); //Afficher Un rendez vous propore a un tel patient
router.put("/:idP/:idR", [verifyToken], updaterendezVous); // Update Rendez vous <-> Changer
router.delete("/:idP/:idR", [verifyToken], deleteRendezVous);

export default router;
