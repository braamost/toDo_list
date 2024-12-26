package com.toDoList.back.Service.ToDoService;

import com.toDoList.back.DAO.TodoRepository;
import com.toDoList.back.Entity.ToDoLists;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ToDoServiceImp implements ToDoService {
    TodoRepository todoRepository;
    @Autowired
    public ToDoServiceImp(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }


    @Override
    public List<ToDoLists> findByCategoryId(Integer categoryId) {
        return todoRepository.findByCategoryId(categoryId);
    }
    @Override
    public ToDoLists Save(ToDoLists toDo) {
        ToDoLists temp= todoRepository.save(toDo);
        return temp;
    }
}
