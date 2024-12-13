package com.toDoList.back.Service.ToDoService;

import com.toDoList.back.Entity.ToDo;

import java.util.List;

public interface ToDoService {
    List<ToDo> findByCategoryId(int categoryId);
    ToDo Save(ToDo toDo);
}
