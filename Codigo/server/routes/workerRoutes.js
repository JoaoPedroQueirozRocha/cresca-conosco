import express from "express";
import * as workerController from "../controller/workerController.js";

const router = express.Router();

router.get('/list', workerController.listWorkers);
router.get('/:id', workerController.getWorker);
router.get('/cargos', workerController.getDistinctCargos);
router.post('/', workerController.createWorker);
router.put('/:id', workerController.updateWorker);
router.delete('/:id', workerController.deleteWorker);

export default router;