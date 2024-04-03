import * as authService from "../services/authService.js";

async function getUser(req, res) {
	try {
		const user = await authService.getUserById(req.params.authId);
		return res.json(user);
	} catch (error) {
        console.error(error);
		res.status(error.response.status).json(error.response.data);
	}
}

async function updateUser(req, res) {
	const userId = req.params.authId;
	const updates = req.body;

	try {
		const updatedUser = await authService.updateUser(userId, updates);
        console.log(updatedUser)
		return updatedUser;
	} catch (error) {
        console.log(error)  
		res.status(error.response.status).json(error.response.data);
	}
}

export { getUser, updateUser };
