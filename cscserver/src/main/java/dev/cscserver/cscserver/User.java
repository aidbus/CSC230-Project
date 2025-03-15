/***************
 * Name: Michael Beehler, '27
 * Date: 2/17/2025
 * Program: Store information about how a "user" is structured
 * 
 */
package dev.cscserver.cscserver;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document (collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private ObjectId id;
    
    private String name;

    private String email;

    private String password;

    private String role;

    private String created_at;

    private String updated_at;
}
