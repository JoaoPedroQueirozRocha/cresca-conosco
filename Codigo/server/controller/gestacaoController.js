import * as gestacaoServices from "../services/gestacaoServices.js";
import * as animalServices from "../services/animalsServices.js";

async function getGestacaoByAnimal(req, res) {
	try {
		const nome_animal = req.params.nome_animal;
		const animal_exists = await animalServices.getAnimalByName(nome_animal);

		if (!animal_exists) throw new Error("Animal não encontrado");

		const gestacao = await gestacaoServices.getGestacaoByAnimal(nome_animal);
		res.json(gestacao);
	} catch (error) {
		res.status(error.status).send("Erro ao executar a query " + error.message);
	}
}

async function createGestacao(req, res) {
	try {
		const body = req.body;
		const gestacao = await gestacaoServices.createGestacao(body);
		res.json(gestacao);
	} catch (error) {
		res.status(error.status).send("Erro ao executar a query " + error.message);
	}
}

async function updateGestacao(req, res) {
	try {
		const body = req.body;
		const nome = req.params.nome_animal;
		const animal = await animalServices.getAnimalByName(nome);

		if (!animal) throw new Error("Animal não encontrado");

		const gestacao = await gestacaoServices.updateGestacao(nome, body);
		res.json(gestacao);
	} catch (error) {
		console.error(error);
		res.status(error.status).send("Erro ao executar a query " + error.message);
	}
}

async function deleteGestacao(req, res) {
	try {
		const nome = req.params.nome_animal;
		const animal = await animalServices.getAnimalByName(nome);
		if (!animal) throw new Error("Animal não encontrado");

		const gestacao = await gestacaoServices.deleteGestacao(nome);
		res.json(gestacao);
	} catch (error) {
		res.status(error.status).send("Erro ao executar a query " + error.message);
	}
}

export { getGestacaoByAnimal, createGestacao, updateGestacao, deleteGestacao };
