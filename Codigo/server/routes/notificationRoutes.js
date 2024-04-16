import express from 'express'
import *  as notificationController from '../controller/notificationController.js'

const router = express.Router()

router.post("/", notificationController.createNewNotification)
router.get("/", notificationController.getNotification)
router.delete("/", notificationController.deleteNotification)

export default router