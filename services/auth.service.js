import axios from 'axios';
import {REACT_APP_BACKEND_URL} from '@env';

const API_URL = REACT_APP_BACKEND_URL + '/api/logs/'

const postLogs = (uuid_creds, location) =>{
    return axios.post(API_URL,{
        uuid_creds,
        location
    });
};

const getLogs = () => {
    axios.get(API_URL)
};

export default {
    postLogs,
    getLogs
}