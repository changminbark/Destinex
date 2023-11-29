import axios from 'axios'

const API_URL = 'http://localhost:8080/api/providers/';
const token = localStorage.getItem('jwtToken');

export const granterRegister = async (granterData) => {
    try {
        return await axios.post(`${API_URL}register`, granterData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log("test")
        console.error('Axios Error:', error);
        throw error; // Rethrow the error to propagate it further
    }
};
