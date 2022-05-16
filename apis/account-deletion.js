import axios from 'axios';

const baseUrl = 'https://juanbreath-server.herokuapp.com';

export const requestForDeletionOfAccount = (data) => {
  return axios.post(`${baseUrl}/api/public/delete-account`, data);
};

