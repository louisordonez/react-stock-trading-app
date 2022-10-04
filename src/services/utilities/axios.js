import axios from 'axios';

const axiosTimeOut = { timeout: 1000 };

export const StockTradingRef = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: axiosTimeOut.timeout,
});

export const axiosGet = async (endpoint) => {
  return StockTradingRef.get(endpoint, axiosTimeOut)
    .then((response) => response)
    .catch((error) => error);
};

export const axiosPost = async (endpoint, body) => {
  return StockTradingRef.post(endpoint, body, axiosTimeOut)
    .then((response) => response)
    .catch((error) => error);
};

export const axiosDelete = async (endpoint, id) => {
  return StockTradingRef.delete(`${endpoint}${id}`, axiosTimeOut)
    .then((response) => response)
    .catch((error) => error);
};
