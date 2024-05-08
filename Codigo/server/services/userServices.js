import express, { response } from 'express'
import pool from '../db/index.js'

const router = express.Router()

router.use(express.json())

async function getUserByEmail(email) {
    const queryResult = await pool.query("SELECT * FROM usuario WHERE email = $1", [email])
    return queryResult.rows[0];
}

async function getUserByToken(token) {
    const queryResult = await pool.query("SELECT * FROM usuario WHERE email = $1", [token])
    return queryResult.rows[0];
}

async function createNewUser(body) {
    const result = await pool.query('INSERT INTO usuario (nome, email, token, descricao) VALUES ($1,$2,$3,$4) RETURNING *', [body.nome, body.email, body.token, body.description])
    return result;
}

async function updateUser(body) {
    const result = await pool.query('UPDATE usuario SET nome = $1, email = $2, token = $3,  descricao = $4 WHERE email = $2', [body.nome, body.email, body.token, body.description])
    return result;
}

async function deleteUser(body) {
    const result = await pool.query('DELETE FROM usuario WHERE email = $1', [body.email])
    return result;
}

export { getUserByEmail, getUserByToken, createNewUser, updateUser, deleteUser }

