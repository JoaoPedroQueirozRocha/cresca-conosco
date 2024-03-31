import * as authService from "../services/authService.js";

async function getUser(req, res) {
	try {
		const user = await authService.getUserById(req.params.authId);
		res.json(user);
	} catch (error) {
		res.status(error.response.status).json(error.response.data);
	}
}

async function updateUser(req, res) {
	const userId = req.params.authId; // Assume que o ID do usuário está disponível como um parâmetro de rota
	const updates = req.body; // Pega os dados de atualização do corpo da requisição

	try {
		const updatedUser = await authService.updateUser(userId, updates);
		res.json(updatedUser);
	} catch (error) {
		res.status(error.response.status).json(error.response.data);
	}
}

export { getUser, updateUser };
