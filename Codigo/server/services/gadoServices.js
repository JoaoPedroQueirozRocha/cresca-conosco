import express from 'express';
import pool  from "../db/index.js";

const router = express.Router();
 
router.use(express.json());

async function getAll(){
    const queryResult = await pool.query('SELECT * FROM animais a JOIN gestacoes g ON a.nome = g.nome_animal');
    return queryResult.rows;
}


export {
    getAll
}

