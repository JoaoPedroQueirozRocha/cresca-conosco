import * as notificationServices from '../services/notificationServices.js'

async function getNotification(req,res) {
    try {
        const notification = await notificationServices.getNotificationBy()

        if (!notification) throw new Error('Notificação não encontrada')

        res.json(notification)

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

async function deleteNotification() {
    try{
        const body = req.body
        const notification = await notificationServices.deleteNotification(body)
        res.json(notification) 
    }catch (error){
        console.error(error);
        res.status(error.status).send('Erro ao deletar notificação' + error.message)
    }   
}

export {getNotification,createNewNotification,deleteNotification}