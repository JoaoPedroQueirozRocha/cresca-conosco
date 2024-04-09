import express from "express";
import * as gestacaoController from "../controller/gestacaoController.js";

const router = express.Router();

router.get("/:nome_animal", gestacaoController.getGestacaoByAnimal);
router.post("/", gestacaoController.createGestacao);
router.put("/:nome_animal", gestacaoController.updateGestacao);
router.delete("/:nome_animal", gestacaoController.deleteGestacao);

export default router;
