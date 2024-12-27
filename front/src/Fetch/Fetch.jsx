import axios from "axios";
export async function fetchData(user,setUser) {
  console.log(user);
  const response = await axios.get(`http://localhost:8080/api/categories/${user.
username
}`);
  setUser(s=>response.data);
  console.log(response.data); 
}
