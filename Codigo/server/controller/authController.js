import * as authService from "../services/authService.js";

async function getUser(req, res) {
    try {
        const user = await authService.getUserById(req.params.authId);
        res.json(user);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
}

async function updatePassword(req, res) {
    const newPassword = req.body.password;
    const authId = req.params.authId;
    try {
        const user = await authService.updateUserPassword(authId, newPassword);
        res.json(user);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
}

async function updateEmail(req, res) {
    const newEmail = req.body.email;
    const authId = req.params.authId;
    try {
        const user = await authService.updateUserEmail(authId, newEmail);
        res.json(user);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
}

async function updateUsername(req, res) {
    const newUsername = req.body.username;
    const authId = req.params.authId;
    try {
        const user = await authService.updateUserName(authId, newUsername);
        res.json(user);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
}

export { getUser, updatePassword, updateEmail, updateUsername };

