import axios from "axios";
export async function fetchData(username) {
  const response = await axios.get(`http://localhost:8080/api/users/${username}`);
  console.log(response)
  return response.data;
}
