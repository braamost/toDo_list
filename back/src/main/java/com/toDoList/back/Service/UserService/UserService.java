package com.toDoList.back.Service.UserService;

import com.toDoList.back.Entity.User;

public interface UserService {
    User save(User theUser);
    User findByUserName(String Username);
    boolean checkPassword(User user, String password);

    User GetAllDetails(User user);
}
