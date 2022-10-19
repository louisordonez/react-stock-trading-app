import axios from 'axios';

export const StockTradingRef = axios.create({
  // baseURL: 'http://localhost:3000/api/v1',
  baseURL: 'https://stock-trading-app-ha2z.onrender.com/',
});

export const axiosGet = async (endpoint, headers) => {
  return StockTradingRef.get(endpoint, {
    headers,
  })
    .then((response) => response)
    .catch((error) => error);
};

export const axiosPost = async (endpoint, body, headers) => {
  return StockTradingRef.post(endpoint, body, {
    headers,
  })
    .then((response) => response)
    .catch((error) => error);
};

export const axiosPut = async (endpoint, body, headers) => {
  return StockTradingRef.put(endpoint, body, {
    headers,
  })
    .then((response) => response)
    .catch((error) => error);
};

export const axiosPatch = async (endpoint, body, headers) => {
  return StockTradingRef.patch(endpoint, body, {
    headers,
  })
    .then((response) => response)
    .catch((error) => {
      throw error.response.data.error;
    });
};

export const axiosDelete = async (endpoint, id) => {
  return StockTradingRef.delete(`${endpoint}${id}`)
    .then((response) => response)
    .catch((error) => error);
};
