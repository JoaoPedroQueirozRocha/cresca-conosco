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
        console.error('Erro');
        res.status(500).send('Erro');
    }
})


// exportando o router para ser utilizado na index
export default router;