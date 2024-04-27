import express, { query } from "express";
import pool from "../db/index.js";
import { getAnimalById } from "./animalsServices.js";

const router = express.Router();

router.use(express.json());

/**
 * @param {number} animal_id - O ID do animal para recuperar os dados de gestação.
 * @returns {Promise<Gestacao>} Uma promessa que resolve para os dados de gestação do animal especificado.
 * Recupera um registro de gestação pelo ID do animal.
 */
async function getGestacaoById(animal_id) {
    const queryResult = await pool.query(
        "SELECT * FROM gestacoes WHERE animal_id = $1",
        [animal_id]
    );
    return queryResult.rows[0];
}

/**
 * @param {object} body - O corpo da requisição com os dados de gestação.
 * @returns {Promise<Gestacao>} Uma promessa que resolve para os dados de gestação do animal especificado.
 * Cria um novo registro de gestação.
 */
async function createGestacao(body) {
    const { animal_id, status, prev_parto, touro, data_insem, data_finalizacao } = body;
    const queryText = "INSERT INTO gestacoes (animal_id, status, prev_parto, touro, data_insem, data_finalizacao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const result = await pool.query(queryText, [animal_id, status, prev_parto, touro, data_insem, data_finalizacao]);
    return result.rows[0];
}

/**
 * @param {number} id - O ID do registro de gestação a ser atualizado.
 * @param {object} updates - O objeto com as atualizações a serem feitas no registro de gestação.
 * @returns {Promise<Gestacao>} Uma promessa que resolve para os dados de gestação do animal especificado.
 * Atualiza um registro de gestação existente.
 */
async function updateGestacao(id, updates) {
    const fields = Object.keys(updates)
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");

    const values = Object.values(updates);
    const query = `UPDATE gestacoes SET ${fields} WHERE id = $${values.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
}

/**
 * @param {number} animal_id - O ID do animal para excluir o registro de gestação.
 * @returns {Promise<Gestacao>} Uma promessa que resolve para os dados de gestação do animal especificado.
 * Exclui um registro de gestação pelo ID do animal.
 */
async function deleteGestacao(animal_id) {
    const result = await pool.query(
        "DELETE FROM gestacoes WHERE animal_id = $1",
        [animal_id]
    );
    return result.rows[0];
}

export { getGestacaoById, createGestacao, updateGestacao, deleteGestacao };
