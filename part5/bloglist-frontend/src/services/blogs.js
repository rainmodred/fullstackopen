import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

function setToken(newToken) {
  token = `bearer ${newToken}`;
}

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

async function create(newBlog) {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
}

async function update(id, updatedBlog) {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return response.data;
}

async function deleteBlog(id) {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
}

export default { getAll, create, setToken, update, deleteBlog };
