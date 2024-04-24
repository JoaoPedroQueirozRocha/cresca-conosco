import express, { response } from 'express'
import pool from '../db/index.js'

const router = express.Router()

router.use(express.json())

async function listWorkers(){
    const queryResult = await pool.query("SELECT * FROM mao_de_obra ORDER BY nome")
    return queryResult.rows[0];
}

async function getWorker(id){
    const queryResult = await pool.query("SELECT * FROM mao_de_obra WHERE id = $1", [id])
    return queryResult.rows[0];
}

async function createWorker(body){    
    const result = await pool.query('INSERT INTO mao_de_obra (nome, salario, descricao) VALUES ($1, $2, $3)', [body.nome, 
        body.salario, body.descricao])
        return result.rows[0];
}

async function updateWorker(body){
    const result = await pool.query('UPDATE mao_de_obra SET nome = $1, salario = $2, descricao = $3 WHERE nome = $1',[body.nome, 
        body.salario, body.descricao])
    return result.rows[0];
}

async function deleteWorker(id){
    const result = await pool.query('DELETE FROM workers WHERE id = $1',[id])
    return result.rows[0];
}

export { listWorkers, getWorker, createWorker, updateWorker, deleteWorker }