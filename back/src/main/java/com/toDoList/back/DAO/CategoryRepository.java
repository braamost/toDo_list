package com.toDoList.back.DAO;
import com.toDoList.back.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT c FROM Category c WHERE c.userId = :userId")
    List<Category> findByUserId(@Param("userId") Integer userId);

    @Query("SELECT c FROM Category c WHERE c.userId = :userId AND c.name = :name")
    List<Category> findByUserIdAndName(@Param("userId") Integer userId, @Param("name") String name);
}
