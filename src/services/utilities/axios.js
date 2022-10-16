import axios from 'axios';

const axiosTimeout = { timeout: 1000 };

export const StockTradingRef = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: axiosTimeout.timeout,
});

export const axiosGet = async (endpoint, headers) => {
  return StockTradingRef.get(
    endpoint,
    {
      headers,
    },
    axiosTimeout
  )
    .then((response) => response)
    .catch((error) => error);
};

export const axiosPost = async (endpoint, body, headers) => {
  return StockTradingRef.post(
    endpoint,
    body,
    {
      headers,
    },
    axiosTimeout
  )
    .then((response) => response)
    .catch((error) => error);
};

export const axiosPut = async (endpoint, body, headers) => {
  return StockTradingRef.put(
    endpoint,
    body,
    {
      headers,
    },
    axiosTimeout
  )
    .then((response) => response)
    .catch((error) => error);
};

export const axiosDelete = async (endpoint, id) => {
  return StockTradingRef.delete(`${endpoint}${id}`, axiosTimeout)
    .then((response) => response)
    .catch((error) => error);
};
