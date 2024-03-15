import axios from 'axios';
const APIURL = `${import.meta.env.VITE_API_URL}/user`

function getUser(id) {
    return axios.get(`${APIURL}/${id}`);
}

function updateUser(id) {
    return axios.put(`${APIURL}/${id}`);
}

function createUser() {
    return axios.post(APIURL);
}

function deleteUser(id) {
    return axios.delete(`${APIURL}/${id}`);
}

export {
    getUser,
    updateUser,
    createUser,
    deleteUser
}