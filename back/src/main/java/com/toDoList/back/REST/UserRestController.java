package com.toDoList.back.REST;

import com.toDoList.back.Entity.User;
import com.toDoList.back.GlobalHandle.NotFoundException;
import com.toDoList.back.GlobalHandle.UnauthorizedException;
import com.toDoList.back.GlobalHandle.UserAlreadyExistsException;
import com.toDoList.back.Service.UserService.UserService;
import org.aspectj.weaver.ast.Var;
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
        if(userService.findByUserName(user.getUsername()) != null)
            throw new UserAlreadyExistsException("User with username " + user.getUsername() + " already exists.");

        user.setUserId(null);
        return userService.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user){
        User theuser = userService.findByUserName(user.getUsername());
        if (theuser == null) {
            throw new NotFoundException("User with username " + user.getUsername() + " not found.");
        }
        if(!userService.checkPassword(theuser, user.getPassword())) {
            throw new UnauthorizedException("Wrong password.");
        }
        return ResponseEntity.ok(theuser);
    }
}
