package com.toDoList.back.Service.ToDoService;

import com.toDoList.back.DAO.TodoRepository;
import com.toDoList.back.Entity.ToDo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ToDoServiceImp implements ToDoService {
    TodoRepository todoRepository;
    @Autowired
    public ToDoServiceImp(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }


    @Override
    public List<ToDo> findByCategoryId(int categoryId) {
        return todoRepository.findByCategory_CategoryId(categoryId);
    }
    @Override
    public ToDo Save(ToDo toDo) {
        ToDo temp= todoRepository.save(toDo);
        return temp;
    }
}
