import express from "express";
import * as workerController from "../controller/workerController.js";

const router = express.Router();

router.get('/:nome', workerController.getWorker);
router.post('/', workerController.createWorker);
router.put('/:nome', workerController.updateWorker);
router.delete('/:nome', workerController.deleteWorker);

export default router;