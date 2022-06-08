import axios from 'axios';

const baseUrl = 'https://juanbreath-server.herokuapp.com';

export const createUserPositiveLogs = data => {
  return axios.post(`${baseUrl}/api/public/positive-log`, data);
};

export const updateUserPositiveLogsRecovered = id => {
  return axios.put(`${baseUrl}/api/public/positive-log/recovered/${id}`);
};

export const getAllMyReports = id => {
  return axios.get(`${baseUrl}/api/public/positive-log/close-contacts/reports/${id}`);
}