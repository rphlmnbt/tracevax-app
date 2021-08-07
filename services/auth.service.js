import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL + '/api/logs/'

const postLogs = (uuid_creds, location) =>{
    return axios.post(API_URL,{
        uuid_creds,
        location
    });
};

const getLogs = () =>{
    return axios.get(API_URL);
};

export default {
    postLogs,
    getLogs
}