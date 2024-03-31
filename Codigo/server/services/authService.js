import axios from "axios";
import "dotenv/config";

// Cria uma instância do Axios para reutilização, com configurações padrão
const axiosInstance = axios.create({
    baseURL: process.env.AUTH0_URL,
    headers: {
        Authorization: `Bearer ${process.env.AUTH0_ADMIN_TOKEN}`
    }
});

async function getUserById(userId) {
    const response = await axiosInstance.get(`/api/v2/users/${userId}`);
    return response.data;
}

async function updateUserPassword(userId, newPassword) {
    const response = await axiosInstance.patch(`/api/v2/users/${userId}`, {
        password: newPassword
    });
    return response.data;
}

async function updateUserEmail(userId, newPassword) {
    const response = await axiosInstance.patch(`/api/v2/users/${userId}`, {
        email: newEmail
    });
    return response.data;
}

async function updateUserName(userId, newUsername) {
    const response = await axiosInstance.patch(`/api/v2/users/${userId}`, {
        name: newUsername
    });
    return response.data;
}

export { getUserById, updateUserPassword, updateUserEmail, updateUserName };
