import axios from "axios";
export async function deleteCategory(categoryId) {
  const response = await axios.delete(`http://localhost:8080/api/categories/${categoryId}`);
}
