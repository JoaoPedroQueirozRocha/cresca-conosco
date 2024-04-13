import express from 'express';
import pool from '../db/index.js';

const router = express.Router()

router.use(express.json())

async function listarLucro(period) {
    if (period.lenght) {
        return await pool.query('SELECT * FROM receita WHERE data BETWEEN $1 AND $2', [period[0], period[1]]);
    } else {
        return await pool.query('SELECT * FROM receita');
    }
}

async function getLucro(id){
    const queryResult = await pool.query('SELECT * FROM receita WHERE id = $1', [id])
    return queryResult.rows[0];
}

async function createLucro(body){
    const result = await pool.query('INSERT INTO receita (descricao, tipo, valor, data) VALUES ($1, $2, $3, $4)', [body.descricao, body.tipo, body.valor, body.data])
    return result;
}

async function updateLucro(body){
    const result = await pool.query('UPDATE receita SET descricao = $2, tipo = $3, valor = $4, data = $5  WHERE id = $1', [body.id, body.descricao, body.tipo, body.valor,  body.data])
    return result;
}

async function deleteLucro(id){
    const result = await pool.query('DELETE FROM Lucro WHERE id = $1',[id])
    return result;
}

export { getLucro, createLucro, updateLucro, deleteLucro, listarLucro }