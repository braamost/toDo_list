package com.toDoList.back.REST;

import com.toDoList.back.Entity.TodoLists;
import com.toDoList.back.Service.ToDoService.ToDoService;
import com.toDoList.back.Service.ToDoService.ToDoServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/todo")
public class ToDoRestController {
    private final ToDoService todoService;

    @Autowired
    public ToDoRestController(ToDoServiceImp todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<TodoLists>> findByCategoryId(@PathVariable Integer categoryId) {
        List<TodoLists> todos = todoService.findByCategoryId(categoryId);
        return ResponseEntity.ok(todos);
    }

    @PostMapping
    public ResponseEntity<TodoLists> save(@RequestBody TodoLists toDo) {
        toDo.setTodoId(null);
        TodoLists savedTodo = todoService.Save(toDo);
        return ResponseEntity.ok(savedTodo);
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<Void> delete(@PathVariable Integer todoId) {
        todoService.delete(todoId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{todoId}")
    public ResponseEntity<TodoLists> update(@PathVariable Integer todoId, @RequestBody TodoLists toDo) {
        toDo.setTodoId(todoId);
        TodoLists updatedTodo = todoService.Save(toDo);
        return ResponseEntity.ok(updatedTodo);
    }
}
