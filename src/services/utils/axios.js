import axios from 'axios';

const axiosTimeOut = { timeout: 1000 };

export const StockTradingRef = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: axiosTimeOut.timeout,
});

export const axiosGet = async () => {
  return StockTradingRef.get('/books', axiosTimeOut)
    .then((response) => response)
    .catch((error) => error);
};

export const axiosPut = async (body) => {
  return StockTradingRef.put('/books', body, axiosTimeOut)
    .then((response) => response)
    .catch((error) => error);
};

export const axiosDelete = async (id) => {
  return StockTradingRef.delete(`/books/${id}`, axiosTimeOut)
    .then((response) => response)
    .catch((error) => error);
};
