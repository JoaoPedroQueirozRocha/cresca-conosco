import express, {query, response} from 'express'
import pool from '../db/index.js'

const router = express.Router()

router.use(express.json())

async function getNotificationById(id){
    const queryResult = await pool.query("SELECT * FROM notifications WHERE id = $1", [id])
    return queryResult.rows[0]
}

async function createNewNotification(body){
    const queryResult = await pool.querry('INSERT INTO notifications (title, description) VALUES ($1,$2) RETURNING *', [body.title, body.description])
    return queryResult
}

async function deleteNotification(body){
    const queryResult = await pool.query('DELETE FROM notifications WHERE id = $1',[body.id])
    return queryResult
}

export {getNotificationById, createNewNotification, deleteNotification}
