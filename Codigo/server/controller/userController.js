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

async function createNewUser(req, res){
    try{
        res.json({requestBody: req.body}) 
        const body = req.body 
        await userServices.createNewUser(body)
    } catch (error){
        console.error(error)
        res.status(error.status).send('Erro ao fazer post') 
    }
}

export { getUserByEmail, createNewUser }

