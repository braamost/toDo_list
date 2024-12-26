package com.toDoList.back.DAO;

import com.toDoList.back.Entity.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<ToDo, Integer> {
    // Use the category.categoryId to correctly query by category ID
    List<ToDo> findByCategory_CategoryId(int categoryId);
}
