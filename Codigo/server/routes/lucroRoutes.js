import express from "express";
import * as lucroController from "../controller/lucroController.js";

const router = expres.Router();

router.get('/:descricao', lucroController.getLucro);
router.post('/', lucroController.createLucro);
router.put('/:descricao', lucroController.updateLucro);
router.delete('/:descricao', lucroController.deleteLucro);

export default router;