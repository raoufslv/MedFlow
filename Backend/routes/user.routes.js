import express from "express";
import {
  signup,
  signin,
  getProfile,
  updateUser,
  updatePassword,
} from "../controllers/user.controller.js";
import {
  forgetPassword,
  resetPassword,
} from "../controllers/forgetPassword.controller.js";
import checkDuplicateUsernameOrEmail from "../middleware/verifyDuplicate.js";
import verifyToken from "../middleware/authJwt.js";

const router = express.Router();

router.post("/signup", [checkDuplicateUsernameOrEmail], signup);
router.post("/signin", signin);
router.get("/profile", [verifyToken], getProfile);
router.put("/profile", [verifyToken], updateUser);
router.get("/verifyToken", [verifyToken], (req, res) => {
  res.status(200).send({ message: "Token is valid" });
});
router.put("/updatePassword", [verifyToken], updatePassword);
router.post("/forgetPassword", forgetPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", (req, res) => {
  res.status(200).send({ accessToken: null });
});

export default router;
