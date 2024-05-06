import * as notificationServices from '../services/notificationServices.js'

async function getNotification(req,res) {
    try {
        const { aniamal_id, title } = req.params; 
        const notification = await notificationServices.getNotification(aniamal_id, title)

        if (!notification) throw new Error('Notificação não encontrada')

        res.json(notification)

    } catch (error) {
        console.error(error)
        res.status(error.status).send('Erro ao fazer query' + error.message)
    }
}


async function getAllNotifications(req,res) {
    try { 
        const notifications = await notificationServices.getAllNotifications()

        if (!notifications) throw new Error('Notificações não encontradas')

        res.json(notifications)

    } catch (error) {
        console.error(error)
        res.status(error.status).send('Erro ao fazer query' + error.message)
    }
}

async function createNewNotification(req,res) {
    try{
        const body = req.body 
        const notification = await notificationServices.createNewNotification(body)
        res.json(notification) 
    } catch (error){
        console.error(error)
        res.status(error.status).send('Erro ao fazer post' + error.message) 
    }

}

async function deleteNotificationById(req,res) {
    try{
        const { id } = req.params
        const notification = await notificationServices.deleteNotificationById(id)
        res.json(notification) 
    }catch (error){
        console.error(error);
        res.status(error.status).send('Erro ao deletar notificação' + error.message)
    }   
}

export {getNotification, createNewNotification, deleteNotificationById, getAllNotifications}