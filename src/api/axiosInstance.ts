import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.42.0.1:5000', // Flask API base URL
});

export default instance;
