import axios from 'axios';

const API_KEY = '5a7c26f16346da98bb5e84601349950'; // Obtenha uma chave de API gratuita em https://exchangeratesapi.io/
const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

export const getExchangeRates = async () => {
  try {
    const response = await axios.get(BASE_URL);
    console.log(response.data.rates, "dados da api")
    return response.data.rates;
  } catch (error) {
    console.error("Erro ao buscar taxas de câmbio:", error);
    return null;
  }
};