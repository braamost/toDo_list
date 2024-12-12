package com.toDoList.back.REST;

import com.toDoList.back.Entity.User;
import com.toDoList.back.Service.UserService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserRestController {
    private final UserService userService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserRestController(UserService userService , PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }
    @GetMapping("/{username}/details")
    public User getUserDetails(@PathVariable String username) {
        return userService.findByUserName(username);
    }
    @PostMapping("/{username}")
    public User createUser(@RequestBody User user){
        return userService.save(user);
    }

    @GetMapping("/username/{userName}/{password}")
    public ResponseEntity<User> findByUserName(@PathVariable String userName, @PathVariable String password)throws Exception{
        User user = userService.findByUserName(userName);
        if (user == null) {
            throw new Exception("User with username " + userName + " not found.");
        }
        if(!userService.checkPassword(user, password)) {
            throw new Exception("Wrong password.");
        }
        return ResponseEntity.ok(user);
    }
}
