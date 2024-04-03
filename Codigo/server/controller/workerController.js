import * as workerServices from "../services/workerServices.js";

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {worker}
 * Função para procurar um funcionário
 */
async function getWorker(req, res){
    try {
        const nome = req.params.nome
        const worker = await workerServices.getWorker(nome)

        if(!worker) throw new Error('Funcionário não encontrado')

        res.json(worker)
    
    } catch (error) {
        console.error(error)
        res.status(error.status).send('Erro ao fazer query pelo nome' + error.message)
    }
}

/**
 * 
 * @param { nome, salario, descricao } req 
 * @param {*} res 
 * @returns {worker}
 * Função para criar um novo funcionário
 * 
 */
async function createWorker(req, res){
    try{
        const body = req.body 
        const worker = await workerServices.createWorker(body)
        res.json(worker)
    } catch (error){
        console.error(error)
        res.status(error.status).send('Erro ao fazer post' + error.message) 
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {worker}
 * Função para atualizar um funcionário
 */
async function updateWorker(req, res){
    try{
        const body = req.body
        const worker = await workerServices.updateWorker(body)
        res.json(worker)
    } catch(error){
        console.error(error);
        res.status(error.status).send('Erro ao fazer update de funcionário' + error.message)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {worker}
 * Função para deletar um funcionário
 */
async function deleteWorker(req,res){
    try{
        const body = req.body
        const worker = await workerServices.deleteWorker(body)
        res.json(worker) 
    }catch (error){
        console.error(error);
        res.status(error.status).send('Erro ao deletar funcionário' + error.message)
    }   
}

export { getWorker, createWorker, updateWorker, deleteWorker}