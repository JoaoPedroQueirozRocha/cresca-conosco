import express from 'express';
import * as gadoController from '../controller/gadoController.js'

const router = express.Router();

router.get('/', gadoController.getAll);
router.get('/base', gadoController.getBaseData);
router.get('/month', gadoController.getByMonth);
router.get('/status/:status', gadoController.getByStatus);
router.get('/animal/:animal', gadoController.getByAnimal);
router.get('/lactantes', gadoController.getLactantes);

export default router;

