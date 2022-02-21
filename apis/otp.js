import axios from 'axios';

const baseUrl = 'https://juanbreath-server.herokuapp.com';

export const registerMobileNumber = data => {
  return axios.post(`${baseUrl}/api/messages/send`, data);
};
