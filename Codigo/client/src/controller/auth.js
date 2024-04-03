import axios from 'axios';
const APIURL = `${import.meta.env.VITE_API_URL}/auth`

function changeUser(id, object) {
    return axios.put(`${APIURL}/auth/update-user/${id}`, object);
}

export default {
    changeUser,
}