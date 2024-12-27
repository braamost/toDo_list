package com.toDoList.back.Service.UserService;

import com.toDoList.back.DAO.CategoryRepository;
import com.toDoList.back.DAO.TodoRepository;
import com.toDoList.back.DAO.UserRepository;
import com.toDoList.back.Entity.Category;
import com.toDoList.back.Entity.TodoLists;
import com.toDoList.back.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private CategoryRepository categoryRepository;
    private TodoRepository todoRepository;

    @Autowired
    public UserServiceImp(UserRepository theuserRepository , PasswordEncoder thepasswordEncoder , CategoryRepository categoryRepository , TodoRepository todo){
        this.userRepository = theuserRepository;
        this.passwordEncoder = thepasswordEncoder;
        this.categoryRepository=categoryRepository;
        this.todoRepository=todo;
    }

    @Override
    public User save(User theUser) {
        theUser.setPassword(passwordEncoder.encode(theUser.getPassword()));
        return userRepository.save(theUser);
    }

    @Override
    public User findByUserName(String Username){
        return userRepository.findByUsername(Username);
    }

    @Override
    public boolean checkPassword(User user, String password) {
        return passwordEncoder.matches(password, user.getPassword());
    }

    @Override
    public User GetAllDetails(User user) {
        List<Category> categories = categoryRepository.getCategoriesByUserID(user.getUserId());
        for(Category category : categories){
            List<TodoLists> tasks = todoRepository.findByCategoryId(category.getCategoryId());
            category.setTasks(tasks);
        }
        user.setCategories(categories);
        return user;
    }
}
