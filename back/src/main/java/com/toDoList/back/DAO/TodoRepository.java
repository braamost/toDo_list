package com.toDoList.back.DAO;

import com.toDoList.back.Entity.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<ToDo, Integer> {
    List<ToDo> findByCategoryId(int categoryId);
}

