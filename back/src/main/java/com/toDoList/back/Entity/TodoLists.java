package com.toDoList.back.Entity;
import jakarta.persistence.*;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "Todo_lists")
public class TodoLists {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todo_id")
    private Integer todoId;

    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "importance")
    @Enumerated(EnumType.STRING)
    private Importance importance = Importance.MEDIUM;

    @Column(name = "created_at" , updatable = false)
    private LocalDateTime createdAt;

    public TodoLists() {}

    public TodoLists(Integer todoId, Integer categoryId, String title, String content, Status status, LocalDateTime dueDate, Importance importance) {
        this.todoId = todoId;
        this.categoryId = categoryId;
        this.title = title;
        this.content = content;
        this.status = status;
        this.dueDate = dueDate;
        this.importance = importance;
    }

    @PrePersist
    public void prePersist() {
        if(createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    public Integer getTodoId() {
        return todoId;
    }

    public void setTodoId(Integer todoId) {
        this.todoId = todoId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Importance getImportance() {
        return importance;
    }

    public void setImportance(Importance importance) {
        this.importance = importance;
    }

    public enum Status {
        PENDING,
        INPROGRESS,
        COMPLETED
    }
    public enum Importance {
        HIGH,
        MEDIUM,
        LOW
    }
}
