import express, {query, response} from 'express'
import pool from '../db/index.js'

const router = express.Router()

router.use(express.json())

async function getNotification(animal_id, title) {
    const queryResult = await pool.query("SELECT * FROM notificacoes WHERE animal_id = $1 AND titulo = $2", [animal_id, title])
    return queryResult.rows[0]
}

async function getAllNotifications() {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5)

    const queryResult = await pool.query("SELECT * FROM notificacoes WHERE vencimento BETWEEN $1 AND $2", [ today, maxDate ])
    return queryResult.rows
}

async function createNewNotification(body) {
    const queryResult = await pool.query('INSERT INTO notificacoes (titulo, descricao, animal_id) VALUES ($1,$2) RETURNING *', [body.titulo, body.descricao, body.animal_id])
    return queryResult
}

async function deleteNotificationById(id) {
    const queryResult = await pool.query('DELETE FROM notificacoes WHERE id = $1',[id])
    return queryResult
}

export {getNotification, createNewNotification, deleteNotificationById, getAllNotifications}
