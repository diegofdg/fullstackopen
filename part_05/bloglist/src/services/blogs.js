import axios from 'axios';
const baseUrl = '/api/blogs';

// eslint-disable-next-line
let token = null;
const setToken = newToken => {
    token = `bearer ${newToken}`;
}

const config = {
    headers: { Authorization: token }
}

const getAll = async () => {
      const response = await axios.get(baseUrl, config);
      return response.data;    
}

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
}

const update = async objectToUpdate => {    
  const response = await axios.put(`${baseUrl}/${objectToUpdate.id}`, objectToUpdate, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update }