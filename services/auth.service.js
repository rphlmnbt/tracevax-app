import axios from 'axios';

const postLogs = (uuid_creds, location) =>{
    return axios.post(`http://localhost:8080/api/logs/`,{
        uuid_creds,
        location
    });
};

const getLogs = () =>{
    return axios.get(`http://localhost:8080/api/logs/`);
};