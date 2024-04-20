import express from 'express';
import pool from "../db/index.js";

const router = express.Router();

router.use(express.json());

async function getAll() {
    const queryResult = await pool.query('SELECT * FROM animais a JOIN gestacoes g ON a.id = g.animal_id');
    return queryResult.rows;
}

async function getBaseData() {
    const queryResult = await pool.query('SELECT a.nome, a.id ,g.data_insem, g.prev_parto, g.touro, g.status, a.lactante FROM animais a LEFT JOIN gestacoes g ON a.id = g.animal_id');
    return queryResult.rows;
}

async function getByMonth(date) {
    const [month, year] = date.split('-')
    const queryResult = await pool.query('SELECT * FROM animais a JOIN gestacoes g ON a.nome = g.nome_animal WHERE EXTRACT(MONTH FROM g.prev_parto) = $1 AND EXTRACT(YEAT FROM g.prev_parto) = $2', [month, year]);
    return queryResult.rows;
}

async function getByStatus(status) {
    const queryResult = await pool.query('SELECT * FROM animais a JOIN gestacoes g ON a.nome = g.nome_animal WHERE g.status = $1', [status]);
    return queryResult.rows;
}

async function getByAnimal(animal) {
    const queryResult = await pool.query('SELECT * FROM animais a JOIN gestacoes g ON a.nome = g.nome_animal WHERE g.nome_animal = $1', [animal]);
    return queryResult.rows;
}

async function getLactantes() {
    const queryResult = await pool.query('SELECT * FROM animais a JOIN gestacoes g ON a.nome = g.nome_animal WHERE a.lactante = true');
    return queryResult.rows;
}


export {
    getAll,
    getByMonth,
    getByStatus,
    getByAnimal,
    getLactantes,
    getBaseData
}

