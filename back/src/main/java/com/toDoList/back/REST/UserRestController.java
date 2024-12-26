package com.toDoList.back.REST;

import com.toDoList.back.Entity.User;
import com.toDoList.back.GlobalHandle.NotFoundException;
import com.toDoList.back.GlobalHandle.UnauthorizedException;
import com.toDoList.back.Service.UserService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserRestController {
    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/{username}")
    public User getUserDetails(@PathVariable String username) {
        User user = userService.findByUserName(username);
        if(user == null) throw new NotFoundException("User with username " + username + " not found.");
        return user;
    }
    @PostMapping
    public User createUser(@RequestBody User user){
        return userService.save(user);
    }

    @GetMapping("/username/{userName}/{password}")
    public ResponseEntity<User> findByUserName(@PathVariable String userName, @PathVariable String password)throws Exception{
        User user = userService.findByUserName(userName);
        if (user == null) {
            throw new NotFoundException("User with username " + userName + " not found.");
        }
        if(!userService.checkPassword(user, password)) {
            throw new UnauthorizedException("Wrong password.");
        }
        return ResponseEntity.ok(user);
    }
}
