import express, {query, response} from 'express'
import pool from '../db/index.js'

const router = express.Router()

router.use(express.json())

async function getNotificationBy(){
    const queryResult = await pool.query("inserir querry")
    return queryResult.rows[0]
}

async function createNewNotification(){
    const queryResult = await pool.querry("inserir querry")
    return queryResult
}

async function deleteNotification(){
    const queryResult = await pool.query("inserir querry")
    return queryResult
}

export {getNotificationBy, createNewNotification, deleteNotification}
