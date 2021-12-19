/* eslint-disable */
import * as axios from 'axios';
// import corsAnywhere from "cors-anywhere"

// const host = "0.0.0.0";
// const port = 4000;

// corsAnywhere.createServer({
//     originWhitelist: [], // Allow all origins
//     requireHeader: ['origin', 'x-requested-with'],
//     removeHeaders: ['cookie', 'cookie2']
// }).listen(port, host, function() {
//     console.log('Running CORS Anywhere on ' + host + ':' + port);
// });

const instance = axios.create({
    // baseURL: 'http://localhost:8000/api/v1',
    baseURL: 'https://arthemcare-api.herokuapp.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default instance; 