import axios from 'axios';

const baseUrl = 'https://juanbreath-server.herokuapp.com';

export const getAllNotification = id => {
  return axios.get(`${baseUrl}/api/public/notification/${id}`);
};

export const getAllNotificationCount = id => {
  return axios.get(`${baseUrl}/api/public/notification/count/${id}`);
};

export const updateNotificationCount = id => {
  return axios.put(`${baseUrl}/api/public/notification/update/${id}`);
};

