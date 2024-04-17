import express, {query, response} from 'express'
import pool from '../db/index.js'

const router = express.Router()

router.use(express.json())

async function getNotificationById(id){
    // const queryResult = await pool.query("SELECT * FROM notificacoes WHERE id = $1", [id])
    // return queryResult.rows[0]
}

async function getAllNotifications(){
    const queryResult = await pool.query("SELECT * FROM notificacoes")
    return queryResult.rows
}


async function createNewNotification(body){
    const queryResult = await pool.query('INSERT INTO notificacoes (titulo, descricao) VALUES ($1,$2) RETURNING *', [body.titulo, body.descricao])
    return queryResult
}

async function deleteNotificationById(id){
    const queryResult = await pool.query('DELETE FROM notificacoes WHERE id = $1',[id])
    return queryResult
}

export {getNotificationById, createNewNotification, deleteNotificationById, getAllNotifications}
