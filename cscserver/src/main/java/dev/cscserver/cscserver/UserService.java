/***************
 * Name: Michael Beehler, '27
 * Date: 2/17/2025
 * Program: Contains functions that would be required for different aspects of managing users
 * 
 */
package dev.cscserver.cscserver;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    // Return a list of all users, and information associated with them
    public List <User> allUsers () {
        return userRepository.findAll();
    }
}
