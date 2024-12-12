package com.toDoList.back.DAO;

import com.toDoList.back.Entity.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<ToDo, Integer> {

}

