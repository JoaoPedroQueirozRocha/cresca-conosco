// Alteração dos requires para import, seguindo o ES6
import express from 'express'
import pool from '../controller/index.js'

const router = express.Router()

router.use(express.json())

let users = [{
    nome: "VargemAlegre",
    senha: "1234"
}]

router.get('/', (req,res)=> {
    res = pool.query('SELECT * from user')
})

// Adicionado um exemplo de try catch que trata os erros da requisiçã e retorna
router.post('/', (req,res)=>{
    try {
        
        console.log("post!")
    
        const user = req.body
    
        users.push(user)
    
        res.send("${user.nome} adicionado")
        console.log("${user.nome} adicionado")

    } catch (e) {
        console.error(e)        
    }
})

router.delete('/:nome', (req,res)=>{

    console.log("removido!")

    const {nome} = req.params

    users = users.filter((user) => user.nome !== nome)

    console.log("${user.nome} removido")
})

router.patch('/:nome', (req,res)=>{
    
    console.log("editado!")

    let {nome} = req.params

    let {senha} = req.body

    user = users.find((user) => user.nome === nome)

    if(senha) {user.senha = senha}
    
    console.log("${user.nome} editado")
})

// exportando o router para ser utilizado na index
export default router;