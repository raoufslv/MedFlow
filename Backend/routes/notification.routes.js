import express from "express";

import {
  getAllNotifications,
  getNotificationById,
  deleteNotification,
  getUnreadNotifications,
} from "../controllers/notification.controller.js";

import verifyToken from "../middleware/authJwt.js";

const router = express.Router();

router.get("/all", [verifyToken], getAllNotifications); //afficher tous les notifications
router.get("/:id", [verifyToken], getNotificationById); //Afficher Un notification propore a un tel patient
router.delete("/:id", [verifyToken], deleteNotification);
router.get("/unread", [verifyToken], getUnreadNotifications);

export default router;
