import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.72.166:5000', // Flask API base URL
});

export default instance;
