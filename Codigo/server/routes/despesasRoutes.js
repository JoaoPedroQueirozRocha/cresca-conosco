import express from "express";
import * as despesasController from "../controller/despesasController.js";

const router = express.Router();

router.get("/:id", despesasController.getDespesaById);
router.post("/", despesasController.createNewDespesa);
router.put("/:id", despesasController.updateDespesaById);
router.delete("/:id", despesasController.deleteDespesaById);

export default router;

