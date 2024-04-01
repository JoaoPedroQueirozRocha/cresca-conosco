import express from "express";
import pool from "../db/index.js";

const router = express.Router();

router.use(express.json());

async function getAnimalByName(name) {
	const queryResult = await pool.query(
		"SELECT * FROM animais WHERE nome = $1",
		[name]
	);
	if (!queryResult.rows.length) throw new Error("Animal não encontrado");

	return queryResult.rows[0];
}

async function createNewAnimal(body) {
	const result = await pool.query(
		"INSERT INTO animais(nome, crias, proxima_insem, num_insem, dias_parida, lactante) VALUES ($1, $2, $3, $4, $5, $6)",
		[
			body.nome,
			body.crias,
			body.proxima_insem,
			body.num_insem,
			body.dias_parida,
			body.lactante,
		]
	);
	return result.rows[0];
}

async function updateAnimalByName(name, updates) {
	const animal = await getAnimalByName(name);

	if (!animal) throw new Error("Animal não encontrado");

	const fields = Object.keys(updates)
		.map((field, index) => `${field} = $${index + 1}`)
		.join(", ");

	const values = Object.values(updates);

	const query = `UPDATE animais SET ${fields} WHERE nome = $${
		values.length + 1
	} RETURNING *`;
	const result = await pool.query(query, [...values, name]);
	return result.rows[0];
}

async function deleteAnimalByName(name) {
	const animal = await getAnimalByName(name);

	if (!animal) throw new Error("Animal não encontrado");

	const result = await pool.query("DELETE FROM animais WHERE nome = $1", [
		name,
	]);

	return result.rows[0];
}

export {
	getAnimalByName,
	createNewAnimal,
	updateAnimalByName,
	deleteAnimalByName,
};
