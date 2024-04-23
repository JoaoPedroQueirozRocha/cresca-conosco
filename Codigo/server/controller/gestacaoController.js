import * as gestacaoServices from "../services/gestacaoServices.js";
import * as animalServices from "../services/animalsServices.js";

async function getGestacaoById(req, res) {
    try {
        const { animal_id } = req.params;
        const animal_exists = await animalServices.getAnimalById(animal_id);

        if (!animal_exists) throw new Error("Animal não encontrado");

        const gestacao = await gestacaoServices.getGestacaoById(animal_id);
        res.json(gestacao);
    } catch (error) {
        console.error(error);
        res.status(error.status).send("Erro ao executar a query " + error.message);
    }
}

async function createGestacao(req, res) {
    try {
        const body = req.body;
        console.log(body);
        const animal = await animalServices.getAnimalById(body.animal_id);
        if (!animal) throw new Error("Animal não encontrado");

        const gestacao = await gestacaoServices.createGestacao(body);
        res.json(gestacao);
    } catch (e) {
        console.error(e);
        res.status(e.status).send("Erro ao executar a query " + e.message);
    }
}

async function updateGestacao(req, res) {
    try {
        const body = req.body;
        const { id_gestacao } = req.params

        const animal = await animalServices.getAnimalById(id_gestacao);
        if (!animal) throw new Error("Animal não encontrado");

        const gestacao = await gestacaoServices.updateGestacao(id_gestacao, body);
        res.status(200).json(gestacao);
    } catch (error) {
        console.error(error);
        res.status(error.status).send("Erro ao executar a query " + error.message);
    }
}

async function deleteGestacao(req, res) {
    try {
        const { animal_id } = req.params
        const animal = await animalServices.getAnimalById(animal_id);
        if (!animal) throw new Error("Animal não encontrado");



        const gestacao = await gestacaoServices.deleteGestacao(animal_id);
        res.json(gestacao);
    } catch (error) {
        res.status(error.status).send("Erro ao executar a query " + error.message);
    }
}

export { getGestacaoById, createGestacao, updateGestacao, deleteGestacao };
