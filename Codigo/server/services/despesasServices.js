import express from "express";
import pool from "../db/index.js";

const router = express.Router();

router.use(express.json());

async function getDespesasById(id) {
    const queryResult = await pool.query("SELECT * FROM despesas d WHERE d.id = $1", [id]);
    return result.rows;
}

async function createNewDespesa(body) {
    const {
        valor,
        descricao,
        tipo,
        data
    } = body;

    const queryResult = await pool.query("INSERT INTO despesas (valor, descricao, tipo, data) VALUES ($1, $2, $3, $4)", [valor, descricao, tipo, data]);
    return queryResult.rows[0];
}

async function updateDespesa(body) {
    const {
        id,
        valor,
        descricao,
        tipo,
        data
    } = body;

    const queryResult = await pool.query("UPDATE despesas SET valor = $1, descricao = $2, tipo = $3, data = $4 WHERE id = $5", [valor, descricao, tipo, data, id]);
    return queryResult.rows[0];
}

export {
    getDespesasById
}
