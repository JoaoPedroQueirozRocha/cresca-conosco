import express, { response } from 'express'
import pool from '../db/index.js'

const router = express.Router()

router.use(express.json())

async function getUserByEmail(email){
    const queryResult = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    return queryResult.rows[0];
}

async function getUserByToken(token){
    const queryResult = await pool.query("SELECT * FROM users WHERE email = $1", [token])
    return queryResult.rows[0];
}

async function createNewUser(body){    
    const result = await pool.query('INSERT INTO users (name, email, token, isadmin, description) VALUES ($1,$2,$3,$4,$5) RETURNING *', [body.name, body.email, body.token, body.isadmin, body.description])
    return result;
}

async function updateUser(body){
    const result = await pool.query('UPDATE users SET name = $1, email = $2, token = $3, isadmin = $4, description = $5 WHERE email = $2',[body.name, body.email, body.token, body.isadmin, body.description])
    return result;
}

async function deleteUser(body){
    const result = await pool.query('DELETE FROM users WHERE email = $1',[body.email])
    return result;
}

export { getUserByEmail, getUserByToken, createNewUser, updateUser, deleteUser }

