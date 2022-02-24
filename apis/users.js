import axios from 'axios';

const baseUrl = 'https://juanbreath-server.herokuapp.com';

export const updateUserType = (data, id) => {
  return axios.put(`${baseUrl}/api/public/users/${id}`, data);
};
