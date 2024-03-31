import axios from 'axios';
const APIURL = `${import.meta.env.VITE_API_URL}/auth`

function changePass(id, object) {
    return axios.put(`${APIURL}/update-password/${id}`, object);
}

export default {
    changePass,
}