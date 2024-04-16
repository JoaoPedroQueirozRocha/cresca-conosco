import express from "express";
import pool from "../db/index.js";

const router = express.Router();

router.use(express.json());

async function getAnimalById(id) {
    const queryResult = await pool.query(
        "SELECT * FROM animais WHERE id = $1",
        [id]
    );
    if (!queryResult.rows.length) throw new Error("Animal não encontrado");

    return queryResult.rows;
}

async function createNewAnimal(body) {
    const result = await pool.query(
        "INSERT INTO animais(nome, crias, primeira_ia, num_insem, lactante) VALUES ($1, $2, $3, $4, $5, $6)",
        [
            body.nome,
            body.crias,
            body.primeira_ia,
            body.num_insem,
            body.dias_parida,
            body.lactante,
        ]
    );
    return result.rows[0];
}

async function updateAnimalById(id, updates) {
    const animal = await getAnimalById(id);

    if (!animal) throw new Error("Animal não encontrado");

    const fields = Object.keys(updates)
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");

    const values = Object.values(updates);

    const query = `UPDATE animais SET ${fields} WHERE id = $${values.length + 1
        } RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
}

async function deleteAnimalByName(id) {
    const animal = await getAnimalById(id);

    if (!animal) throw new Error("Animal não encontrado");

    const result = await pool.query("DELETE FROM animais WHERE id = $1", [
        id,
    ]);

    return result.rows[0];
}

export {
    getAnimalById,
    createNewAnimal,
    updateAnimalById,
    deleteAnimalByName,
};
