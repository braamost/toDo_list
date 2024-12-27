import axios from "axios";
export async function fetchData(user,setUser) {
  console.log(user.username + "the sended user name");
  const response = await axios.get(`http://localhost:8080/api/categories/${user.
username
}`);
  setUser(s=>({
    ...s,
    categories: response.data
  }));
}
