import express from "express";
import * as animalsController from "../controller/animalsController.js";

const router = express.Router();

router.get("/:nome", animalsController.getAnimalByName);
router.post("/", animalsController.createNewAnimal);
router.put("/:nome", animalsController.updateAnimalByName);
router.delete("/:nome", animalsController.deleteAnimalByName);

export default router;
