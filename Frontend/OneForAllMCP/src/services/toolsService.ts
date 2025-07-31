import axios from 'axios';

const API_URL = 'http://127.0.0.2:8001';

export const getTools = async () => {
  const response = await axios.get(`${API_URL}/tools`);
  return response.data;
};
