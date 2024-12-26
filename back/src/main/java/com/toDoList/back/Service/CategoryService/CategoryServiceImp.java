package com.toDoList.back.Service.CategoryService;

import com.toDoList.back.DAO.CategoryRepository;
import com.toDoList.back.Entity.Category;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CategoryServiceImp {
    CategoryRepository categoryRepository;
    @Autowired
    public CategoryServiceImp(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    List<Category> findByUserId(int userId){
        return categoryRepository.getCategoriesByUserID(userId);
    }

    Category save(Category category){
        Category temp = categoryRepository.save(category);
        return  temp;
    }

}
