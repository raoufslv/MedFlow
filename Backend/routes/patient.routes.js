import express from "express";
import verifyToken from "../middleware/authJwt.js";
import {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
    res.status(400).send({ message: "Invalid file type" });
  }
};

let upload = multer({ storage, fileFilter });

router.post(
  "/add",
  [verifyToken],
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "bilans", maxCount: 5 },
  ]),
  addPatient
);
router.get("/all", [verifyToken], getPatients);
router.get("/:id", [verifyToken], getPatientById);
router.put("/:id", [verifyToken], updatePatient);
router.delete("/:id", [verifyToken], deletePatient);

export default router;
