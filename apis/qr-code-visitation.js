import axios from 'axios';

const baseUrl = 'https://juanbreath-server.herokuapp.com';

export const createUserVisitationHistroy = data => {
  return axios.post(`${baseUrl}/api/visitation-history`, data);
};
