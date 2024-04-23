import express, { query } from "express";
import pool from "../db/index.js";
import { getAnimalById } from "./animalsServices.js";

const router = express.Router();

router.use(express.json());

async function getGestacaoById(animal_id) {
    const queryResult = await pool.query(
        "SELECT * FROM gestacoes WHERE animal_id = $1",
        [animal_id]
    );
    return queryResult.rows[0];
}

async function createGestacao(body) {
    const { animal_id, status, prev_parto, touro, data_insem, data_finalizacao } = body;
    const queryText = "INSERT INTO gestacoes (animal_id, status, prev_parto, touro, data_insem, data_finalizacao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const result = await pool.query(queryText, [animal_id, status, prev_parto, touro, data_insem, data_finalizacao]);
    return result.rows[0];
}

async function updateGestacao(id, updates) {
    const fields = Object.keys(updates)
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");

    const values = Object.values(updates);
    const query = `UPDATE gestacoes SET ${fields} WHERE id = $${values.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
}

async function deleteGestacao(animal_id) {
    const result = await pool.query(
        "DELETE FROM gestacoes WHERE animal_id = $1",
        [animal_id]
    );
    return result.rows[0];
}

export { getGestacaoById, createGestacao, updateGestacao, deleteGestacao };
