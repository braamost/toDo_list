package com.toDoList.back.DAO;
import com.toDoList.back.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByUsername(String username);
}
