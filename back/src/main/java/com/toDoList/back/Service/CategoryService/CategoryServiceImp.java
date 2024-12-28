package com.toDoList.back.Service.CategoryService;

import com.toDoList.back.DAO.CategoryRepository;
import com.toDoList.back.DAO.TodoRepository;
import com.toDoList.back.Entity.Category;
import com.toDoList.back.Entity.TodoLists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImp implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final TodoRepository todoRepository;

    @Autowired
    public CategoryServiceImp(CategoryRepository categoryRepository , TodoRepository todoRepository) {
        this.categoryRepository = categoryRepository;
        this.todoRepository=todoRepository;
    }

    @Override
    public List<Category> findByUserId(Integer userId){
        List<Category>  categories = categoryRepository.findByUserId(userId);
        for(Category category : categories){
            List<TodoLists> tasks = todoRepository.findByCategoryId(category.getCategoryId());
            category.setTasks(tasks);
        }
        return categories ;
    }

    @Override
    public Category save(Category category){
        return categoryRepository.save(category);
    }

    @Override
    public void delete(Integer categoryID) {
        categoryRepository.deleteById(categoryID);
    }

    @Override
    public List<Category> findByUserIdAndName(Integer userId, String name) {
        return categoryRepository.findByUserIdAndName(userId, name);
    }
}