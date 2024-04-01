import * as userServices from '../services/userServices.js'

async function getUserByEmail(req, res){
    try {
        const email = req.params.email
        const user = await userServices.getUserByEmail(email)

        if(!user) throw new Error('Usuário não encontrado')

        res.json(user)
    
    } catch (error) {
        console.error(error)
        res.status(error.status).send('Erro ao fazer query por email')
    }
}

async function getUserByToken(req, res){
    try {
        const token = req.params.token
        const user = await userServices.getUserByToken(token)

        if(!user) throw new Error('Usuário não encontrado')

        res.json(user)
    
    } catch (error) {
        console.error(error)
        res.status(error.status).send('Erro ao fazer query por token')
    }
}

async function createNewUser(req, res){
    try{
        res.json(req.body) 
        const body = req.body 
        await userServices.createNewUser(body)
    } catch (error){
        console.error(error)
        res.status(error.status).send('Erro ao fazer post') 
    }
}

async function updateUser(req, res){
    try{
        res.json(req.body)
        const body = req.body
        await userServices.updateUser(body)
    } catch(error){
        console.error(error);
        res.status(error.status).send('Erro ao fazer update de usuário')
    }
}

async function deleteUser(req,res){
    try{
        res.json(req.body) 
        const body = req.body
        await userServices.deleteUser(body)
    }catch (error){
        console.error(error);
        res.status(error.status).send('Erro ao fazer update de usuário')
    }   
}

export { getUserByEmail, getUserByToken, createNewUser, updateUser, deleteUser }

