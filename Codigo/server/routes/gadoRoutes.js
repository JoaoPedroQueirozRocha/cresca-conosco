import express from 'express';
import * as gadoController from '../controller/gadoController.js'

const router = express.Router();

router.get('/', gadoController.getAll);

export default router;

