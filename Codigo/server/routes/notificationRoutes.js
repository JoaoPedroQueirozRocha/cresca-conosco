import express from 'express'
import *  as notificationController from '../controller/notificationController.js'

const router = express.Router()

router.post("/", notificationController.createNewNotification)
router.get("/:animal_id/:title", notificationController.getNotification)
router.get("/list", notificationController.getAllNotifications)
router.delete("/:id", notificationController.deleteNotificationById)

export default router