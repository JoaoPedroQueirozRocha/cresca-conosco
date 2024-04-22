import express from 'express';
import pool from "../db/index.js";

const router = express.Router();

router.use(express.json());

async function getAll() {
    const queryResult = await pool.query('SELECT * FROM animais a LEFT JOIN gestacoes g ON a.id = g.animal_id ORDER BY a.nome');
    return queryResult.rows;
}
// async function getAll() {
//     const queryResult = await pool.query(`
//         SELECT animais.*, gestacao_mais_recente.*
//         FROM animais
//         LEFT JOIN (
//             SELECT gestacoes.*
//             FROM gestacoes
//             INNER JOIN (
//                 SELECT animal_id, MAX(data_insem) AS data_insem_maxima
//                 FROM gestacoes
//                 GROUP BY animal_id
//             ) AS ultima_gestacao ON gestacoes.animal_id = ultima_gestacao.animal_id AND gestacoes.data_insem = ultima_gestacao.data_insem_maxima
//         ) AS gestacao_mais_recente ON animais.id = gestacao_mais_recente.animal_id
//         ORDER BY animais.nome
//     `);
//     return queryResult.rows;
// }

async function getBaseData() {
    const queryResult = await pool.query('SELECT a.nome, g.id, g.data_insem, g.prev_parto, g.touro, g.status, a.lactante FROM animais a LEFT JOIN gestacoes g ON a.id = g.animal_id ORDER BY a.nome');
    return queryResult.rows;
}

// async function getBaseData() {
//     const queryResult = await pool.query(`
//     SELECT a.nome, a.id, gestacao_mais_recente.data_insem, gestacao_mais_recente.prev_parto, gestacao_mais_recente.touro, gestacao_mais_recente.status, gestacao_mais_recente.data_finalizacao, a.lactante
//     FROM animais a
//     LEFT JOIN (
//         SELECT g.*
//         FROM gestacoes g
//         WHERE g.data_finalizacao IS NOT NULL
//         AND NOT EXISTS (
//             SELECT 1
//             FROM gestacoes g2
//             WHERE g2.animal_id = g.animal_id AND g2.data_finalizacao IS NULL
//         )
//         AND g.data_insem = (
//             SELECT MAX(g3.data_insem)
//             FROM gestacoes g3
//             WHERE g3.animal_id = g.animal_id AND g3.data_finalizacao IS NOT NULL
//         )
//     ) AS gestacao_mais_recente ON a.id = gestacao_mais_recente.animal_id
//     ORDER BY a.nome
//     `);
//     return queryResult.rows;
// }

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

