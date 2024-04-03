import express, { response } from 'express'
import pool from '../db/index.js'

const router = express.Router()

router.use(express.json())

async function getWorker(nome){
    const queryResult = await pool.query("SELECT * FROM mao_de_obra WHERE nome = $1", [nome])
    return queryResult.rows[0];
}

async function createWorker(body){    
    const result = await pool.query('INSERT INTO mao_de_obra (nome, salario, descricao) VALUES ($1,$2,$3)', [body.nome, 
        body.salario, body.descricao])
        return result;
}

async function updateWorker(body){
    const result = await pool.query('UPDATE mao_de_obra SET nome = $1, salario = $2, descricao = $3 WHERE nome = $1',[body.nome, 
        body.salario, body.descricao])
    return result;
}

async function deleteWorker(body){
    const result = await pool.query('DELETE FROM workers WHERE nome = $1',[body.nome])
    return result;
}

export { getWorker, createWorker, updateWorker, deleteWorker }