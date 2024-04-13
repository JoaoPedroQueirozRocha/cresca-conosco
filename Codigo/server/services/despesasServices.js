import express from "express";
import pool from "../db/index.js";

const router = express.Router();

router.use(express.json());

async function listarDespesas(period) {
    if (period.lenght) {
        return await pool.query('SELECT * FROM despesas WHERE data BETWEEN $1 AND $2', [period[0], period[1]]);
    } else {
        return await pool.query('SELECT * FROM despesas');
    }
}

async function getDespesaById(id) {
    const result = await pool.query("SELECT * FROM despesas d WHERE d.id = $1", [id]);
    return result.rows;
}

async function createNewDespesa(body) {
    const {
        valor,
        descricao,
        tipo,
        data
    } = body;

    const queryResult = await pool.query("INSERT INTO despesas (valor, descricao, tipo, data) VALUES ($1, $2, $3, $4) RETURNING *", [valor, descricao, tipo, data]);
    return queryResult.rows[0];
}

async function updateDespesaById(id, updates) {
    const despesa = await getDespesaById(id);
    if (!despesa) throw new Error("Despesa não encontrada");
    const fields = Object.keys(updates)
        .map(((field, index) => `${field} = $${index + 1}`))
        .join(", ");

    const values = Object.values(updates);
    const query = `UPDATE despesas SET ${fields} WHERE id = $${values.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
}

async function deleteDespesaById(id) {
    const result = await pool.query("DELETE FROM despesas d WHERE d.id = $1", [id])
    return result.rows[0]
};

export {
    getDespesaById,
    createNewDespesa,
    updateDespesaById,
    deleteDespesaById,
    listarDespesas
}
