import axios from 'axios';
const baseUrl = '/api/blogs';

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

export default { getAll };
