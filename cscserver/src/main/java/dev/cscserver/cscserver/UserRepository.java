/***************
 * Name: Michael Beehler, '27
 * Date: 2/17/2025
 * Program: A repository that helps in storing users
 * 
 */
package dev.cscserver.cscserver;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId>{
    
}
