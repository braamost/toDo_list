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

    @Autowired
    public UserServiceImp(UserRepository theuserRepository , PasswordEncoder thepasswordEncoder){
        this.userRepository = theuserRepository;
        this.passwordEncoder = thepasswordEncoder;
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
}
