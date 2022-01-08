/* eslint-disable */
import * as axios from 'axios';
const token = null ?? localStorage.getItem('token')

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    // baseURL: 'https://arthemcare-api.herokuapp.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});


  
export default instance; 