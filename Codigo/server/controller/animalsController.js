import * as animalsServices from "../services/animalsServices.js";

async function getAnimalById(req, res) {
    try {
        const { id } = req.params
        const animal = await animalsServices.getAnimalById(id);

        if (!animal) throw new Error("Animal não encontrado");

        res.status(200).json(animal);
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
        console.error(error);
        res.status(error.status).send("Erro ao executar a query " + error.message);
    }
}

async function updateAnimalById(req, res) {
    try {
        const body = req.body;
        const { id } = req.params
        const animal = await animalsServices.updateAnimalById(id, body);

        if (!animal) throw new Error('Animal não encontrado');

        res.json(animal);
    } catch (error) {
        res.status(error.status).send("Erro ao executar a query " + error.message);
    }
}

async function deleteAnimalById(req, res) {
    try {
        const id = req.params.id;
        const animal = await animalsServices.deleteAnimalById(id);

        if (!animal) throw new Error('Animal não encontrado');

        res.json(animal);
    } catch (error) {
        console.error(error);
        res.status(error.status).send("Erro ao executar a query " + error.message);
    }
}


export {
    getAnimalById,
    createNewAnimal,
    updateAnimalById,
    deleteAnimalById,
};
