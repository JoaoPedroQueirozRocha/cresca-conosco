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
 * @param {*} req 
 * @param {*} res 
 * @returns {worker}
 * Função para criar um novo funcionário
 */
async function createWorker(req, res){
    try{
        res.json(req.body)
        const body = req.body 
        await workerServices.createWorker(body)
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
        res.json(req.body)
        const body = req.body
        await workerServices.updateWorker(body)
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
        res.json(req.body) 
        const body = req.body
        await workerServices.deleteWorker(body)
    }catch (error){
        console.error(error);
        res.status(error.status).send('Erro ao deletar funcionário' + error.message)
    }   
}

export { getWorker, createWorker, updateWorker, deleteWorker}