import express, { query } from "express";
import pool from "../db/index.js";

const router = express.Router();

router.use(express.json());

/**
 * 
 * @param {Array} headers 
 * @param {Array} data 
 * @param {string} tableName 
 * @returns {Promise<void>}
 * A função recebe um array contendo os headers da tabela, um array contendo os dados a serem inseridos e o nome da tabela em questão.
 * A função retorna uma Promise que resolve com o resultado da inserção.
 * Possiveis tables:
 *  - animais
 *  - gestacao
 *  - mao_de_obra
 *  - despesa
 *  - receita
 */
async function insertMultiple(headers, data, tableName) {
    const column = headers.join(',');

    const placeholders = data.map((_, index) => `(${headers.map((_, i) => `$${index * headers.length + i + 1}`).join(', ')})`).join(', ');
    const values = data.flatMap(obj => headers.map(header => obj[header]));

    const query = `INSERT INTO ${tableName} (${column}) VALUES ${placeholders};`;

    const result = await pool.query(query, values);
    return result.rows[0];
}

export { insertMultiple };

