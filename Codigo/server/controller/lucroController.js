import * as lucroServices from "../services/lucroServices.js"

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {lucro}
 * Função para procurar um lucro
 */

async function getLucro(req, res){
    try {
        const descricao = req.params.descricao
        const lucro = await lucroServices.getLucro(descricao)

        if(!lucro) throw new Error('Lucro não encontrado')

        res.json(lucro)
    } catch (error) {
    console.error(error)
    res.status(error.status).send('Erro ao fazer query pela descrição' + error.message)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {worker}
 * Função para adicionar novo lucro
 */
async function createLucro(req, res){
    try{
        const body = req.body
        const lucro = await lucroServices.createLucro(body)
        res.json(lucro)
    } catch(error) {
        console.error(error)
        res.status(error.status).send('Erro ao fazer post' + error.message)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {lucro}
 * Função para atualizar um lucro
 */
async function updateLucro(req, res){
    try{
        const body = req.body
        const lucro = await lucroServices.updateLucro(body)
        res.json(lucro)

    } catch(error) {
        console.error(error);
        res.status(error.status).send('Erro ao fazer update do lucro' + error.message)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {lucro}
 * Função para deletar um lucro
 */
async function deleteLucro(req,res){
    try{
        const body = req.body
        const lucro = await worker.deleteLucro(body)
        res.json(lucro)
    } catch (error){
        console.error(error);
        res.status(error.status).send('Erro ao deletar Lucro' + console.error)
    }
}

export { getLucro, createLucro, updateLucro, deleteLucro}