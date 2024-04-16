import express, { query } from "express";
import pool from "../db/index.js";
import { getAnimalById } from "./animalsServices.js";

const router = express.Router();

router.use(express.json());

async function getGestacaoByAnimal(animal) {
    const queryResult = await pool.query(
        "SELECT * FROM gestacoes WHERE nome_animal = $1",
        [animal]
    );
    return queryResult.rows[0];
}

async function createGestacao(body) {
    const result = await pool.query(
        "INSERT INTO gestacoes (animal_id, status, prev_parto, touro, data_insem, data_conclusao) VALUES ($1, $2, $3, $4, $5, $6)",
        [
            body.animal_id,
            body.status,
            body.prev_parto,
            body.touro,
            body.data_insem,
            body.data_conclusao,
        ]
    );
    return result.rows[0];
}

async function updateGestacao(id, updates) {
    const animal = await getAnimalById(id);
    if (!animal) throw new Error("Animal não encontrado");

    const fields = Object.keys(updates)
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");

    const values = Object.values(updates);
    const query = `UPDATE gestacoes SET ${fields} WHERE animal_id = $${values.length + 1
        } RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
}

async function deleteGestacao(nome) {
    const result = await pool.query(
        "DELETE FROM gestacoes WHERE nome_animal = $1",
        [nome]
    );
    return result.rows[0];
}

export { getGestacaoByAnimal, createGestacao, updateGestacao, deleteGestacao };
