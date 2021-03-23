import axios from 'axios';
import ApiError from '../util/ApiError';
axios.defaults.adapter = require('axios/lib/adapters/http')

async function getCepCorreios(cep: string) {
  await axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
    timeout: 10000
  }).then((response) => {
    cep = response.data.cep
  }).catch(await function (err) {
    throw new ApiError('Erro ao buscar cep na base dos correios');
  })
  return cep;
}

export default getCepCorreios;