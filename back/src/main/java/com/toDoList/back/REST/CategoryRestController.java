package com.toDoList.back.REST;

import com.toDoList.back.Entity.Category;
import com.toDoList.back.Entity.User;
import com.toDoList.back.GlobalHandle.AlreadyExistsException;
import com.toDoList.back.Service.CategoryService.CategoryService;
import com.toDoList.back.Service.UserService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/categories")
public class CategoryRestController {

    private final CategoryService categoryService;
    private final UserService userService;

    @Autowired
    public CategoryRestController(CategoryService categoryService , UserService userService) {
        this.categoryService = categoryService;
        this.userService= userService;
    }

    // Get all categories for a specific user
    @GetMapping("/{username}")
    public ResponseEntity<List<Category>> getCategoriesByUserId(@PathVariable String username) {
        User user = userService.findByUserName(username);
        List<Category> categories = categoryService.findByUserId(user.getUserId());
        return ResponseEntity.ok(categories);
    }
    // Create a new category
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        List<Category> categories = categoryService.findByUserIdAndName(category.getUserId(), category.getName());
        if(!categories.isEmpty()) throw new  AlreadyExistsException("you already have a category with this name");
        Category savedCategory = categoryService.save(category);
        return ResponseEntity.ok(savedCategory);
    }
    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable Integer categoryId) {
        categoryService.delete(categoryId);
    }
}
