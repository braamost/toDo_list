import axios from "axios";

export async function fetchData(user, setUser) {
  try {
    console.log(`Fetching data for user: ${user.username}`);
    const response = await axios.get(`http://localhost:8080/api/categories/${user.username}`);
    console.log("categories: ", response.data);
    setUser(prevUser => ({
      ...prevUser,
      categories: response.data
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
