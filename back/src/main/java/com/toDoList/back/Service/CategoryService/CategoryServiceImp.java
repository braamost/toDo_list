package com.toDoList.back.Service.CategoryService;

import com.toDoList.back.DAO.CategoryRepository;
import com.toDoList.back.Entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImp implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImp(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> findByUserId(int userId){
        return categoryRepository.getCategoriesByUserID(userId);
    }

    @Override
    public Category save(Category category){
        return categoryRepository.save(category);
    }
}