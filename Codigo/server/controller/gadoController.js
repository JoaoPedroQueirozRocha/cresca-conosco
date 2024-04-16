import * as gadoServices from '../services/gadoServices.js'
import * as animalServices from '../services/animalsServices.js'

async function getAll(req, res) {
    try {
        const gado = await gadoServices.getAll();

        if (!gado) throw new Error('Nenhum gado encontrado');

        res.status(200).json(gado);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}

async function getBaseData(req, res) {
    try {
        const gado = await gadoServices.getBaseData();

        if (!gado) throw new Error('Nenhum gado encontrado');

        res.status(200).json(gado);

    } catch (e) {
        console.log(e);
        res.status(e.status).send(e.message);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns gado
 * Método de pesquisa por mês, recebendo dois valores, mês e ano. Retorna uma lista de todos os animais com previsão de parto para
 * a data especificada
 */
async function getByMonth(req, res) {
    try {
        const { date } = req.body;
        const gado = await gadoServices.getByMonth(date);

        if (!gado) throw new Error('Nenhum gado encontrado');

        res.status(200).json(gado);
    } catch (e) {
        console.error(e);
        res.status(e.status).send(e.message);
    }
}

/**
 * 
 * @param {*} req 
 * Status possiveis:
 * -pendente
 * -confirmada
 * -concluida
 * -falhou
 * @param {*} res 
 * @returns gado
 * Método de pesquisa por status, recebendo um valor, status. Retorna uma lista de todos os animais com previsão de parto para
 * a data especificada
 */
async function getByStatus(req, res) {
    try {
        const { status } = req.params;
        const gado = await gadoServices.getByStatus(status.toLowerCase());

        if (!gado) throw new Error('Nenhum gado encontrado');

        res.status(200).json(gado);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}

async function getByAnimal(req, res) {
    try {
        const { animal } = req.params;

        const animal_exists = await animalServices.getAnimalById(animal);
        if (!animal_exists) throw new Error('Animal não encontrado');

        const gado = await gadoServices.getByAnimal(animal);

        if (!gado) throw new Error('Nenhum gado encontrado');

        res.status(200).json(gado);
    } catch (e) {
        console.error(e);
        res.status(e.status).send(e.message);
    }
}

async function getLactantes(req, res) {
    try {
        const lactantes = await gadoServices.getLactantes();
        res.status(200).json(lactantes);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}

export {
    getAll,
    getBaseData,
    getByMonth,
    getByStatus,
    getByAnimal,
    getLactantes
}

