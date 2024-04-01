// Alteração dos requires para import, seguindo o ES6
import express, { response } from 'express'
import pool from '../db/index.js'

const router = express.Router()

router.use(express.json())

async function getUserByEmail(email){
    const queryResult = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    return queryResult.rows[0];
}

async function getUserByToken(token){
    const queryResult = await pool.query("SELECT * FROM users WHERE email = $1", [token])
    return queryResult.rows[0];
}

async function createNewUser(body){    
    const result = await pool.query('INSERT INTO users (name, email, token, isadmin, description) VALUES ($1,$2,$3,$4,$5) RETURNING *', [body.name, body.email, body.token, body.isadmin, body.description])
    return result;
}

async function updateUser(body){
    const result = await pool.query('UPDATE users SET name = $1, email = $2, token = $3, isadmin = $4, description = $5 WHERE email = $2',[body.name, body.email, body.token, body.isadmin, body.description])
    return result;
}

async function deleteUser(body){
    const result = await pool.query('DELETE FROM users WHERE email = $1',[body.email])
    return result;
}

//
// router.get('/getUserToken/:email', async (req, res) => {
//     const email = req.params.email
//     try{
//         const queryResult = await pool.query('SELECT u.token FROM users u WHERE u.token = $1', u.email)
//         if(queryResult.rows.length > 0){
//             res.json(queryResult)
//         }else{
//             res.status(404).send('Erro ao pesquisar usuário por token')
//         }
//     }catch{
//         console.error('Erro ao fazer a query pelo token')
//         res.status(404).send('Erro ao fazer query por token')
//     }
// })
//
// router.post('/', async (req,res)=>{
//     const {name, email, token, isadmin, description} = req.body
//     try{
//         pool.query('INSERT INTO users (name, email, token, isadmin, description) VALUES ($1,$2,$3,$4,$5) RETURNING *', [name, email, token, isadmin, description])
//     }catch{
//         console.error('Erro ao fazer o post')
//         res.status(404).send('Erro ao fazer o post')
//     }
// })

// router.put('/:email', async (req,res)=>{
//     const email = req.params.email
//     const {name, email, senha_hash, token} = req.body
//     try{
//         pool.query('UPDATE users SET email = $2, senha_hash = $3, token = $4 WHERE email = $2',(name, email, token))
//     }catch{
//         console.error('Erro ao fazer o put')
//         res.status(404).send('Erro ao fazer o put')
//     }
// })

// router.delete('/:email', async (req,res)=>{
//     const email = req.params.email
//     try{
//     pool.query('DELETE FROM users WHERE email = $1', email)
//     }catch{
//         console.error('Erro ao fazer o delete')
//         res.status(404).send('Erro ao fazer o delete')
//     }
// })

export { getUserByEmail, getUserByToken, createNewUser, updateUser, deleteUser }

