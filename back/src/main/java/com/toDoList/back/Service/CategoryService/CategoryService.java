package com.toDoList.back.Service.CategoryService;

import com.toDoList.back.Entity.Category;

import java.util.List;

public interface CategoryService {
    List<Category> findByUserId(Integer userId);
    Category save(Category category);
}
