import express from "express";
import * as authController from "../controller/authController.js";

const router = express.Router();

router.get("/:authId", authController.getUser);
router.patch("/update-password/:authId", authController.updatePassword);
router.patch("/update-username/:authId", authController.updateUsername);
router.patch("/update-email/:authId", authController.updateEmail);

export default router;
