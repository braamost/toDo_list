import axios from "axios";

export async function deleteCategory(categoryId) {
  try {
    const response = await axios.delete(`http://localhost:8080/api/categories/${categoryId}`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}