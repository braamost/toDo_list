import axios from "axios";

export async function fetchData(user, setUser) {
  try {
   
    const response = await axios.get(`http://localhost:8080/api/categories/${user.username}`);
    
    setUser(prevUser => ({
      ...prevUser,
      categories: response.data
    }));
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
