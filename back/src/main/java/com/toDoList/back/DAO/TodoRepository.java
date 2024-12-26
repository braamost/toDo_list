package com.toDoList.back.DAO;

import com.toDoList.back.Entity.ToDoLists;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<ToDoLists, Integer> {
    @Query("SELECT t FROM ToDoLists t WHERE t.categoryId = :categoryId")
    List<ToDoLists> findByCategoryId(@Param("categoryId") Integer categoryId);
}
