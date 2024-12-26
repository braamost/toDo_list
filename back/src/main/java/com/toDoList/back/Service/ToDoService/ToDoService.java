package com.toDoList.back.Service.ToDoService;

import com.toDoList.back.Entity.TodoLists;

import java.util.List;

public interface ToDoService {
    List<TodoLists> findByCategoryId(Integer categoryId);
    TodoLists Save(TodoLists toDo);
}
