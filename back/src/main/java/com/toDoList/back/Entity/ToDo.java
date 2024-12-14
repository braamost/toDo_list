package com.toDoList.back.Entity;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "TodoLists")
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int todoId;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private java.sql.Date dueDate;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public ToDo() {}

    public ToDo(int todoId, String title, String description, Status status, Date dueDate, Category category) {
        this.todoId = todoId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
        this.category = category;
    }

    public int getTodoId() {
        return todoId;
    }

    public void setTodoId(int todoId) {
        this.todoId = todoId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public enum Status {
        PENDING,
        IN_PROGRESS,
        COMPLETED
    }
}
