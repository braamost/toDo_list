package com.toDoList.back.Service.ToDoService;

import com.toDoList.back.DAO.TodoRepository;
import com.toDoList.back.Entity.TodoLists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoServiceImp implements ToDoService {
    TodoRepository todoRepository;
    @Autowired
    public ToDoServiceImp(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }


    @Override
    public List<TodoLists> findByCategoryId(Integer categoryId) {
        return todoRepository.findByCategoryId(categoryId);
    }
    @Override
    public TodoLists Save(TodoLists toDo) {
        return todoRepository.save(toDo);
    }
}
