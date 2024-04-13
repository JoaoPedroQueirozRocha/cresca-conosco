import express, { response } from 'express'
import pool from '../db/index.js'

const router = express.Router()

router.use(express.json())

async function getLucro(descricao){
    const queryResult = await pool.query ('Select * FROM Lucro WHERE descricao = $1', [descricao])
    return queryResult.rows[0];
}

async function createLucro(body){
    const result = await pool.query('INSERT INTO Lucro (descricao, valor) VALUES ($1,$2)', [body.descricao, body.valor])
    return result;
}

async function updateLucro(body){
    const result = await pool.query('UPDATE lucro SET DESCRICAO = $1, valor = $2 WHERE descricao = $1', [body.descricao, body.valor, body.descricao])
    return result;
}

async function deleteLucro(body){
    const result = await pool.query('DELETE FROM Lucro WHERE descricao = $1',[body.descricao])
    return result;
}

export { getLucro, createLucro, updateLucro, deleteLucro}