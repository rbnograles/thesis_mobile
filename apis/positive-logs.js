import axios from 'axios';

const baseUrl = 'https://juanbreath-server.herokuapp.com';

export const createUserPositiveLogs = data => {
  return axios.post(`${baseUrl}/api/public/positive-log`, data);
};
