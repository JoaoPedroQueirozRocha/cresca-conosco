import axios from "axios";
import express from "express";
import 'dotenv/config'

const router = express.Router();
router.use(express.json())

// Cria uma instância do Axios para reutilização, com configurações padrão
const axiosInstance = axios.create({
    baseURL: process.env.AUTH0_URL,
    headers: {
        Authorization: `Bearer ${process.env.AUTH0_ADMIN_TOKEN}`
    }
});

/**
 * Obtém informações do usuário pelo ID.
 * 
 * @param {string} authId - ID do usuário recuperado do objeto contido no session storage.
 * @returns {object} Objeto contendo as informações do usuário.
 */
router.get("/auth-user/:authId", async (req, res) => {
    const userId = req.params.authId;
    try {
        const response = await axiosInstance.get(`/api/v2/users/${userId}`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({error: error.message});
    }
});

/**
 * Atualiza a senha do usuário.
 * 
 * @param {string} authId - ID do usuário.
 * @param {string} password - Nova senha do usuário.
 * @returns {object} Objeto contendo a resposta da atualização.
 */
router.patch("/update-password/:authId", async (req, res) => {
    const userId = req.params.authId;
    const newPassword = req.body.password;
    try {
        const response = await axiosInstance.patch(`/api/v2/users/${userId}`, {
            password: newPassword,
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).json({error: error.message});
    }
});

export default router;