import * as animalsServices from "../services/animalsServices.js";

async function getAnimalByName(req, res) {
	try {
		const nome = req.params.nome;
		const animal = await animalsServices.getAnimalByName(nome);

		if (!animal) throw new Error("Animal não encontrado");

		res.json(animal);
	} catch (error) {
		console.error(error);
		res.status(error.status).send("Erro ao executar a query " + error.message);
	}
}

async function createNewAnimal(req, res) {
	try {
		const body = req.body;
		const animal = await animalsServices.createNewAnimal(body);
		res.json(animal);
	} catch (error) {
		res.status(error.status).send("Erro ao executar a query " + error.message);
	}
}

async function updateAnimalByName(req, res) {
	try {
		const body = req.body;
		const nome = req.params.nome;
		const animal = await animalsServices.updateAnimalByName(nome, body);
		res.json(animal);
	} catch (error) {
		console.error(error);
		res.status(error.status).send("Erro ao executar a query " + error.message);
	}
}

async function deleteAnimalByName(req, res) {
	try {
		const nome = req.params.nome;
		const animal = await animalsServices.deleteAnimalByName(nome);
		res.json(animal);
	} catch (error) {
		res.status(error.status).send("Erro ao executar a query " + error.message);
	}
}

export {
	getAnimalByName,
	createNewAnimal,
	updateAnimalByName,
	deleteAnimalByName,
};
