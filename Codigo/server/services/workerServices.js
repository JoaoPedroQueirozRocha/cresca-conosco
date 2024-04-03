import express, { response } from 'express'
import pool from '../db/index.js'

const router = express.Router()

router.use(express.json())

async function getWorker(nome){
    const queryResult = await pool.query("SELECT * FROM workers WHERE name = $1", [nome])
    return queryResult.rows[0];
}

async function createWorker(body){    
    const result = await pool.query('INSERT INTO workers (name, salario, descricao) VALUES ($1,$2,$3) RETURNING *', [body.name, 
        body.salario, body.descricao])
    return result;
}

async function updateWorker(body){
    const result = await pool.query('UPDATE workers SET name = $1, salario = $2, descricao = $3 WHERE name = $1',[body.name, 
        body.salario, body.descricao])
    return result;
}

async function deleteWorker(body){
    const result = await pool.query('DELETE FROM workers WHERE name = $1',[body.name])
    return result;
}

export { getWorker, createWorker, updateWorker, deleteWorker }