/***************
 * Name: Michael Beehler, '27
 * Date: 2/17/2025
 * Program: Determines what happens when someone wants to view information about users 
 * Notes: Currently, it just returns a list of all users when the person running the app vists "localhost:8080/users"
 */
package dev.cscserver.cscserver;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping ("/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers () {
        return new ResponseEntity<List<User>>(userService.allUsers(), HttpStatus.OK);
    }
    
}
