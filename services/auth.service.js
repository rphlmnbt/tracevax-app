import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL + '/api/logs/'

const postLogs = (uuid_creds, location) =>{
    return axios.post("http://localhost:8080/api/logs/",{
        uuid_creds,
        location
    });
};

const getLogs = () => {
    axios.get("http://localhost:8080/api/logs/")
    .then(function (response){
        console.log(response.data)
        return response;
    });
};

export default {
    postLogs,
    getLogs
}