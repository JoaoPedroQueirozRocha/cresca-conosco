// Alteração dos requires para import, seguindo o ES6
import express from 'express'
import pool from '../controller/index.js'

const router = express.Router()

router.use(express.json())


router.get('/', async (req,res) => {
    try {
        const queryResult = await pool.query("SELECT * FROM users");
        res.json(queryResult.rows)
    } catch (error) {
        console.error('Erro'); //descrever erro
        res.status(500).send('Erro');
    }
})

router.get('/:name', async (req, res) => {
    const userName = req.params.name
    try{
        const queryResult = await pool.query('SELECT * FROM users WHERE name = $1', userName)
        if(queryResult.rows.length > 0){
            res.json(queryResult)
        }else{
            res.status(404).send('Erro ao pesquisar usuário por nome')
        }
    }catch{
        console.error('Erro ao fazer a query pelo nome')
        res.status(404).send('Erro ao fazer query por nome')
    }
})

router.get('/:email', async (req, res) => {
    const userEmail = req.params.email
    try{
        const queryResult = await pool.query('SELECT * FROM users WHERE email = $1', userEmail)
        if(queryResult.rows.length > 0){
            res.json(queryResult)
        }else{
            res.status(404).send('Erro ao pesquisar usuário por email')
        }
    }catch{
        console.error('Erro ao fazer a query pelo email')
        res.status(404).send('Erro ao fazer query por email')
    }
})

router.get('/:senha', async (req, res) => {
    const userSenha = req.params.senha
    try{
        const queryResult = await pool.query('SELECT * FROM users WHERE senha_hash = $1', userSenha)
        if(queryResult.rows.length > 0){
            res.json(queryResult)
        }else{
            res.status(404).send('Erro ao pesquisar usuário pela senha')
        }
    }catch{
        console.error('Erro ao fazer a query pela senha')
        res.status(404).send('Erro ao fazer query pela senha')
    }
})

router.get('/:token', async (req, res) => {
    const userToken = req.params.name
    try{
        const queryResult = await pool.query('SELECT * FROM users WHERE token = $1', userToken)
        if(queryResult.rows.length > 0){
            res.json(queryResult)
        }else{
            res.status(404).send('Erro ao pesquisar usuário por token')
        }
    }catch{
        console.error('Erro ao fazer a query pelo token')
        res.status(404).send('Erro ao fazer query por token')
    }
})

router.post('/', async (req,res)=>{
    const {name, email, senha_hash, token, isadmin, description} = req.body
    try{
        pool.query('INSERT INTO users (name, email, senha_hash, token, isadmin, description) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [name, email, senha_hash, token, isadmin, description])
    }catch{
        console.error('Erro ao fazer o post')
        res.status(404).send('Erro ao fazer o post')
    }
})

router.put('/', async (req,res)=>{
    const {name, email, senha_hash, token} = req.body
    try{
        pool.query('UPDATE users SET email = $2, senha_hash = $3, token = $4 WHERE name = $1',(name, email, senha_hash, token))
    }catch{
        console.error('Erro ao fazer o put')
        res.status(404).send('Erro ao fazer o put')
    }
})

router.delete('/', async (req,res)=>{
    const {name, email, senha_hash, tolken} = req.body

    try{
    pool.query('DELETE FROM users WHERE name = $1', name)
    }catch{
        console.error('Erro ao fazer o delete')
        res.status(404).send('Erro ao fazer o delete')
    }
})

// exportando o router para ser utilizado na index
export default router;