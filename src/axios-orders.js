import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-build-a-burger-adf19.firebaseio.com/'
});

export default instance;