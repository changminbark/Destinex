import axios from 'axios'

const API_URL = 'http://localhost:8080/api/jobs';

export const addJob = (jobData) => {
    return axios.post(`${API_URL}`, jobData);
};
