package com.toDoList.back.Service.ToDoService;

import com.toDoList.back.Entity.ToDoLists;

import java.util.List;

public interface ToDoService {
    List<ToDoLists> findByCategoryId(Integer categoryId);
    ToDoLists Save(ToDoLists toDo);
}
