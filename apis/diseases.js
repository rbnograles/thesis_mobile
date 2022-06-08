import axios from 'axios';

const baseUrl = 'https://juanbreath-server.herokuapp.com';

export const getAllDiseases = () => {
  return axios.get(`${baseUrl}/api/public/disease/many`);
};
